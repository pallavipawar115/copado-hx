import { Command } from 'commander';
import { commit } from '../api/cicd';

export const commitCmd =
  new Command('commit')

  .requiredOption(
    '-s, --story <id>'
  )

  .action(async (opts) => {

    const result =
      await commit(opts.story);

    console.log(result);
  });