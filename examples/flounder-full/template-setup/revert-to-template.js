const util = require('node:util');
const path = require('node:path');
const exec = util.promisify(require('node:child_process').exec);
const config = require('./config');
const cookieVars = config.template.placeholderValues;

const flounderPath = '../../flounder-cookiecutter-template';
const appNameCookie = 'template';
const flounderNewPath = `${flounderPath}/${appNameCookie}`;
let shell = '/bin/bash';

const exclude = config.excludeFromCopying
  .map((element) => `--exclude="${element}"`)
  .join(' ');

async function prepareSpace() {
  await exec(`mkdir -p ${flounderNewPath}`);
}

async function revertIAC() {
  console.log('1. Reverting IAC');
  await exec(`rsync -r ${exclude} ./iac ${flounderNewPath}`);
  await replaceValuesForPlaceholders();
}

async function revertCode() {
  console.log('2. Reverting code');
  await exec(`rsync -r ${exclude} ../ ${flounderNewPath}/code`);
  await replaceValuesForPlaceholders();
}

async function revertAtlantis() {
  console.log('5. Reverting atlantis');
  await exec(`rsync ./atlantis.yaml ${flounderNewPath}/atlantis.yaml`);
  await replaceValuesForPlaceholders();
}

async function revertRoot() {
  console.log('3. Reverting root');
  await exec(
    `rsync -r --exclude=iac/ --exclude revert-to-template.js --exclude=atlantis.yaml ./ ${flounderPath}`
  );
  await replaceValuesForPlaceholders();
}

async function moveGHSettings() {
  console.log('6. Moving GH settings');
  await exec(`mv ${flounderNewPath}/code/.github ${flounderNewPath}`);

  async function replaceWorkingDirectoryStringForActions() {
    const workingDirectoryString = 'working-directory: ./';
    const workingDirectoryEscapedString = 'working-directory: .\\/';
    const newWorkingDirectoryEscapedString = 'working-directory: .\\/code';
    const replaceString = `grep -rli '${workingDirectoryString}' ${flounderNewPath} | xargs -I@ sed -i '' -e 's/${workingDirectoryEscapedString}/${newWorkingDirectoryEscapedString}/g' @`;
    await exec(replaceString).catch(() => {});
  }

  async function replaceDependabotDirectoryString() {
    const workingDirectoryString = 'directory: "/"';
    const workingDirectoryEscapedString = 'directory: \\"\\/\\"';
    const newWorkingDirectoryEscapedString = 'directory: \\"\\/code\\/\\"';
    const replaceString = `grep -rli '${workingDirectoryString}' ${flounderNewPath} | xargs -I@ sed -i '' -e 's/${workingDirectoryEscapedString}/${newWorkingDirectoryEscapedString}/g' @`;
    await exec(replaceString).catch(() => {});
  }

  await replaceWorkingDirectoryStringForActions();
  await replaceDependabotDirectoryString();
}

async function chmodSHFiles() {
  console.log('7. chmodding .sh files');
  await exec(`chmod +x ${flounderNewPath}/code/.aws/*.sh`);
}

async function replaceValuesForPlaceholders() {
  for (const [key, value] of Object.entries(cookieVars)) {
    if (Array.isArray(value)) {
      for (const val of value) {
        const string = `grep -rli '${val}' ${flounderNewPath} | xargs -I@ sed -i '' -e 's/${val}/<%=${key}%>/g' @`;
        await exec(string).catch(() => {});
      }
    } else {
      const string = `grep -rli '${value}' ${flounderNewPath} | xargs -I@ sed -i '' -e 's/${value}/<%=${key}%>/g' @`;
      await exec(string).catch(() => {});
    }
  }
}

async function markFilesForRendering() {
  console.log('4. Mark files for rendering process');
  const excludeFromRendering = config.excludeFromRendering
    .map((filepath) => `! -path "${path.join('./*', filepath)}"`)
    .join(' ');
  await exec(
    `for file in $(find ${flounderNewPath}/ -type f ${excludeFromRendering}); do mv $file $(dirname $file)/_$(basename $file); done`,
    { shell }
  );
}

async function getShell() {
  return await exec(`test -f "/bin/zsh"`)
    .then(() => '/bin/zsh')
    .catch(() => exec(`test -f "/bin/bash"`).then(() => '/bin/bash'))
    .catch(() => '/bin/sh');
}

(async function () {
  shell = await getShell();
  console.log(`Running with shell: ${shell}`);
  console.log('Reverting flounder to template!');
  await prepareSpace();
  try {
    await revertIAC();
  } catch (e) {
    console.error('Failed to revert IAC', e);
    process.exit();
  }
  try {
    await revertCode();
  } catch (e) {
    console.error('Failed to revert CODE', e);
    process.exit();
  }
  try {
    await revertRoot();
  } catch (e) {
    console.error('Failed to revert ROOT', e);
    process.exit();
  }
  try {
    await markFilesForRendering();
  } catch (e) {
    console.error('Failed to marking files for rendering', e);
    process.exit();
  }
  try {
    await revertAtlantis();
  } catch (e) {
    console.error('Failed to revert Atlantis', e);
    process.exit();
  }
  try {
    await moveGHSettings();
  } catch (e) {
    console.error('Failed to move GH settings', e);
    process.exit();
  }
  try {
    await chmodSHFiles();
  } catch (e) {
    console.error('Failed to chmod sh files', e);
    process.exit();
  }
  console.log(
    `Successfully reverted flounder to template. Find it at ${flounderNewPath}`
  );
})();
