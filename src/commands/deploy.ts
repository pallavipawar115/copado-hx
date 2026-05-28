import { Command } from 'commander';

import chalk from 'chalk';

import {
  pollJob
} from '../api/cicd';

import {
  pollUntilDone
} from '../utils/poller';

export const deployCmd =
  new Command('deploy')

  .description(
    'Deploy current story'
  )

  .requiredOption(
    '--env <env>',
    'Target environment'
  )

  .option(
    '-w, --watch',
    'Watch deployment'
  )

  .action(async (opts: any) => {

    console.log(
      chalk.cyan(
        '\n════════ DEPLOYMENT ════════\n'
      )
    );

    console.log(
      chalk.yellow(
        `🚀 Deploying to ${opts.env}`
      )
    );

    console.log(
      chalk.blue(
        '📦 Packaging metadata...'
      )
    );

    await new Promise(
      r => setTimeout(r, 1500)
    );

    console.log(
      chalk.blue(
        '🔍 Checking dependencies...'
      )
    );

    await new Promise(
      r => setTimeout(r, 1500)
    );

    console.time(
      chalk.green(
        '⏱ Deployment Time'
      )
    );

    const jobId =
      'JOB-001';

    if (opts.watch) {

      await pollUntilDone(
        () => pollJob(jobId)
      );
    }

    console.timeEnd(
      chalk.green(
        '⏱ Deployment Time'
      )
    );

    console.log(
      chalk.green(
        `\n✅ Deployment to ${opts.env} successful\n`
      )
    );
  });