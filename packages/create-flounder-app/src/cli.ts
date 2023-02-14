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
}

async function downloadAndExtractRepo(repositoryPath: IRepositoryPath) {
  await withTmpFile(async (tempFilePath) => {
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

run().then((path: string) =>
  console.log(chalk.green(`Successfully Created project in ${path} :)`))
);
