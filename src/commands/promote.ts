import { Command } from 'commander';
import { promote } from '../api/cicd';

export const promoteCmd =
  new Command('promote')

  .requiredOption(
    '-s, --story <id>'
  )

  .action(async (opts) => {

    const result =
      await promote(opts.story);

    console.log(result);
  });