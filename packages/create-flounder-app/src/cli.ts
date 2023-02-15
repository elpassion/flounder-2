#!/bin/env node

import { Command } from "commander";
import packageJson from "../package.json";
import chalk from "chalk";
import * as process from "process";
import * as path from "path";
import { makeDir } from "./helpers/index.js";
import { join } from "path";
import { tmpdir } from "os";
import { pipeline } from "stream/promises";
import got from "got";
import { createWriteStream } from "fs";
import { unlink } from "fs/promises";
import { x as tarX } from "tar";
import shell from "shelljs";
import { createRequire } from "node:module";
import * as child_process from "child_process";
const require = createRequire(import.meta.url);

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .argument("[app-name]", "App name and where it should be created.", ".")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .requiredOption(
    "-E, --example [name]|[github-url]",
    "example name or url",
    parseExample
  )
  .parse(process.argv);

function parseExample(example: string): IRepositoryPath {
  const match = example.trim().match(/https:\/\/github.com\/(.+)\/(.+)/);
  if (match) {
    return {
      url: new URL(example),
      path: "",
      username: match[1],
      name: match[2],
    };
  } else {
    return {
      url: new URL("https://github.com/elpassion/flounder-2"),
      path: example,
      username: "elpassion",
      name: "flounder-2",
    };
  }
}

async function run() {
  const projectDirectory = program.args[0] || ".";
  const appName =
    projectDirectory === "."
      ? path.resolve(".").split("/").at(-1)!
      : program.args[0];

  const exampleRepositoryPath = program.opts().example as IRepositoryPath;
  const newProjectPath = path.resolve(projectDirectory);

  await createApp(appName, newProjectPath, exampleRepositoryPath);

  return newProjectPath;
}

async function createApp(
  appName: string,
  path: string,
  repositoryPath: IRepositoryPath
) {
  await makeDir(path);
  process.chdir(path);
  await downloadAndExtractRepo(repositoryPath);
  await installDependencies();
  await runAfterGenerate();
  await createInitialCommit();
}

async function downloadAndExtractRepo(repositoryPath: IRepositoryPath) {
  await withTmpFile(async (tempFilePath) => {
    logger.yellow("Downloading example...");
    await downloadTar(repositoryPath).into(tempFilePath);

    await tarX({
      file: tempFilePath,
      cwd: ".",
      strip:
        repositoryPath.path === ""
          ? 1
          : 1 + repositoryPath.path.split("/").length,
      filter: (path) => {
        return path
          .split("/")
          .slice(1)
          .join("/")
          .startsWith(repositoryPath.path);
      },
    });
    logger.green("Successfully downloaded example");
  });
}

async function withTmpFile(cb: (tmpFilePath: string) => Promise<void> | void) {
  const tmpFilePath = join(tmpdir(), `flounder-example.temp-${Date.now()}`);
  await cb(tmpFilePath);
  await unlink(tmpFilePath);
}

function downloadTar({ username, name }: IRepositoryPath) {
  const tarUrl = `https://api.github.com/repos/${username}/${name}/tarball`;

  return {
    into: async (tempFilePath: string) =>
      await pipeline(got.stream(tarUrl), createWriteStream(tempFilePath)),
  };
}

interface IRepositoryPath {
  url: URL;
  path: string;
  username: string;
  name: string;
}

async function installDependencies() {
  logger.yellow("Installing dependencies...");
  shell.exec("pnpm i");
  logger.green("Dependencies installed :)");
}

async function runAfterGenerate() {
  logger.yellow(
    "Looking for flounder:after:generate script in package.json..."
  );
  const packageJson = require(process.cwd() + "/package.json");
  if (packageJson.scripts?.["flounder:after:generate"]) {
    logger.yellow("Running flounder:after:generate");
    child_process.execFileSync("pnpm", ["run", "flounder:after:generate"], {
      stdio: "inherit",
    });
    logger.green("Successfully ran flounder:after:generate!");
  } else {
    logger.yellow(
      "No flounder:after:generate script found. If you want to do something after project generation add it to your package.json."
    );
  }
}

const logger = {
  green: (text: string) => console.log(`\n${chalk.green(text)}\n`),
  yellow: (text: string) => {
    console.log(`\n${chalk.yellow(text)}\n`);
  },
};

async function createInitialCommit() {
  logger.yellow("Initializing git repository...");
  shell.exec("git init");
  shell.exec("git commit -am 'Initial commit from cfa'");
  logger.green("Created first commit!");
}

run().then((path: string) =>
  logger.green(`Successfully Created project in ${path} :)`)
);
