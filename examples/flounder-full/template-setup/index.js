#!/usr/bin/env node

const fs = require("node:fs").promises
const { join } = require("path");
const { exec } = require("node:child_process");
const scaffe = require("scaffe");
const { program } = require("commander");
const templateDir = __dirname + "/template";
const config = require("./config");

function filterIgnoredPackages(options) {
  const optionalPackages = Object.values(config.template.packages)
  const optionalPackagesOptions = Object
    .keys(options)
    .map(option => option.replace('no_', ''))
    .filter(option => optionalPackages.includes(option))

  return optionalPackagesOptions.reduce((acc, value) => acc
      .replace(value, '')
      .replace(/(^,)|(,$)/g, '')
    , config.template.placeholderValues.packages)
}

function mapOptionsToTemplateVariables(options, templateOutDir) {
  const packages = filterIgnoredPackages(options)

  return {
    ...options,
    packages,
    app_name: options.project || templateOutDir,
    aws_region: options.region,
    aws_repo_name: options.project,
  };
}

async function generateTemplate(variables, outDir) {
  const generator = scaffe.generate(templateDir, outDir, {
    overwrite: true,
    dot: true,
    variables,
  });

  await ignoreOptionalPackages(variables, generator);
  await generator;
  await handlePostGenerateCleanup();
}

async function handlePostGenerateCleanup() {
  const workspaceTempPath = join(templateDir, 'code/_workspace.temp.json')

  await fs.unlink(workspaceTempPath)
}

async function ignoreOptionalPackages(variables, generator) {
  const workspacePath = join(templateDir, 'code/_workspace.json')
  const workspaceTempPath = join(templateDir, 'code/_workspace.temp.json')

  const workspaceData = await fs
    .readFile(workspacePath)
    .then(JSON.parse)

  if (variables?.no_mobile) {
    delete workspaceData.projects[config.template.packages.mobile]

    generator.ignore(`code/apps/${config.template.packages.mobile}/**/*`);
  }

  if (variables?.no_admin) {
    delete workspaceData.projects[config.template.packages.admin]

    generator.ignore(`code/apps/${config.template.packages.admin}/**/*`);
  }

  if (variables?.no_backend) {
    delete workspaceData.projects[config.template.packages.backend]

    generator.ignore(`code/apps/${config.template.packages.backend}/**/*`);
  }

  if (variables?.no_frontend) {
    delete workspaceData.projects[config.template.packages.frontend]

    generator.ignore(`code/apps/${config.template.packages.frontend}/**/*`);
  }

  await fs.writeFile(workspaceTempPath, JSON.stringify(workspaceData, null, 2))
  generator.add('code/_workspace.temp.json', 'code/workspace.json')
}

async function chmodSHFiles(outDir) {
  await exec(`chmod +x ${outDir}/code/.aws/*.sh`);
}

async function generateAndroidFiles(outDir) {
  await exec(`chmod +x ${outDir}/code/apps/mobile/android/gradle`);
  let generateKeystoreCommand = '';
  const generateKeystore = 'keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey';
  const passOptions = '-keypass android -keyalg RSA -keysize 2048 -validity 10000';
  const passDName = '-dname "CN=Android Debug, OU=Android, O=Android, L=Warsaw, ST=mazowieckie, C=PL"';
  generateKeystoreCommand = generateKeystore.concat(' ', passOptions, ' ', passDName);

  await exec(generateKeystoreCommand, { cwd: `${outDir}/code/apps/mobile/android/app/` });
}

// --------------------
// COMMANDS

program
  .command("new")
  .description("Create new project")
  .argument("<name>", "Name of the project folder")
  .option("-p, --project <value>", "Set name of the project")
  .option("-c, --client <value>", "Set name of the client")
  .option("--no_mobile", "Ignore react native project")
  .option("--no_backend", "Ignore backend project")
  .option("--no_frontend", "Ignore frontend project")
  .option("--no_admin", "Ignore admin panel")
  .option(
    "-r, --region <value>",
    "Set AWS region",
    config.template.defaultValues.awsRegion
  )
  .action(async (templateOutDir, options) => {
    try {
      const variables = mapOptionsToTemplateVariables(options, templateOutDir);
      await generateTemplate(variables, templateOutDir);
      await chmodSHFiles(templateOutDir)
      if(!variables?.no_mobile) {
        await generateAndroidFiles(templateOutDir)
      }
      console.log(`Project ${variables.app_name} created successfully!`);
    } catch (err) {
      console.error("Some errors occured while generating a project :(");
      console.log(err);
    }
  });

program.parse();
