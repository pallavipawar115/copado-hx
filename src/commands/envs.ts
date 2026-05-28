import { Command } from 'commander';
import { listEnvironments } from '../api/cicd';

export const envsCmd =
  new Command('envs')

  .description('List environments')

  .action(async () => {

    const envs =
      await listEnvironments();

    console.log(envs);
  });