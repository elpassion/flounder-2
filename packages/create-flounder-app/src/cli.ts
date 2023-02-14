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
import { x } from "tar";

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
      path: `examples/${example}`,
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

  const examplePath = program.opts().example as IRepositoryPath;

  await createApp(appName, path.resolve(projectDirectory), examplePath);
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
  const tempFile = await downloadTar(repositoryPath);

  await x({
    file: tempFile,
    cwd: ".",
    strip: repositoryPath.path.split("/").length,
    filter: (path) => {
      return true;
    },
  });

  await unlink(tempFile);
}

async function downloadTar({ username, name }: IRepositoryPath) {
  const tempFile = join(tmpdir(), `flounder-example.temp-${Date.now()}`);
  const tarUrl = `https://api.github.com/repos/${username}/${name}/tarball`;
  await pipeline(got.stream(tarUrl), createWriteStream(tempFile));
  return tempFile;
}

interface IRepositoryPath {
  url: URL;
  path: string;
  username: string;
  name: string;
}

run().then();
