import { Command } from 'commander';
import { pollJob } from '../api/cicd';

export const jobsCmd =
  new Command('jobs');

jobsCmd
  .command('poll')

  .requiredOption(
    '-i, --id <id>'
  )

  .action(async (opts) => {

    const result =
      await pollJob(opts.id);

    console.log(result);
  });