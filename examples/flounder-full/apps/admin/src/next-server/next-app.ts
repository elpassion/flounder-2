import * as path from 'path';
import next from 'next';
import { NextBuildBuilderOptions } from '@nrwl/next';
import { prepareConfig } from '@nrwl/next/src/utils/config';
import { PHASE_DEVELOPMENT_SERVER } from '@nrwl/next/src/utils/constants';

export const createNextApp = async (dir: string, hostname: string, port: number): Promise<any> => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (!isDevelopment) {
    return next({ dev: false, dir, hostname, port });
  }

  const {
    parseTargetString,
    readJsonFile,
    readTargetOptions,
    workspaceLayout,
  } = await import('@nrwl/devkit');

  const { createProjectGraphAsync, readProjectsConfigurationFromProjectGraph } = await import(
    'nx/src/project-graph/project-graph'
  );
  const { workspaceRoot } = await import('nx/src/utils/workspace-root');

  const projectConfig = readJsonFile<any>(`${dir}/project.json`);
  const projectGraph = await createProjectGraphAsync();
  const workspaceConfig = readProjectsConfigurationFromProjectGraph(projectGraph);
  const context = {
    root: workspaceRoot,
    cwd: process.cwd(),
    workspace: workspaceConfig,
    isVerbose: false,
    projectGraph,
    nxJsonConfiguration: {
      defaultProject: 'admin'
    }
  };
  const buildOptions = readTargetOptions<NextBuildBuilderOptions>(
    parseTargetString(projectConfig.targets?.['serve']?.options?.['buildTarget'] ?? ''),
    context,
  );
  const conf = await prepareConfig(
    PHASE_DEVELOPMENT_SERVER,
    buildOptions,
    context,
    [],
    path.join(context.root, workspaceLayout().libsDir),
  );

  return next({ dev: true, dir, conf, hostname, port });
}
