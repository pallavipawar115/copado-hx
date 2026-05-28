import { Command } from 'commander';

import {
  listJobs,
  pollBuild
} from '../api/test';

import {
  pollUntilDone
} from '../utils/poller';

export const testCmd =
  new Command('test')

  .description(
    'CRT testing commands'
  );


// -----------------------------
// test jobs
// -----------------------------

testCmd
  .command('jobs')

  .description(
    'List test jobs'
  )

  .action(async () => {

    const jobs =
      await listJobs();

    console.log(jobs);
  });


// -----------------------------
// test run
// -----------------------------

testCmd
  .command('run')

  .requiredOption(
    '--job <id>',
    'Test Job ID'
  )

  .option(
    '-w, --watch',
    'Watch test execution'
  )

  .description(
    'Run test job'
  )

  .action(async (opts: any) => {

    console.log(
      `🧪 Running test job ${opts.job}`
    );

    if (opts.watch) {

      await pollUntilDone(
        () =>
          pollBuild(opts.job)
      );
    }

    console.log(
      '✅ Tests completed'
    );
  });