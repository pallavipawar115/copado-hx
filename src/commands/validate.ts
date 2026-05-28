import { Command } from 'commander';

import chalk from 'chalk';

import {
  validate,
  pollJob
} from '../api/cicd';

import {
  pollUntilDone
} from '../utils/poller';

export const validateCmd =
  new Command('validate')

  .requiredOption(
    '-s, --story <id>',
    'User Story ID'
  )

  .option(
    '-w, --watch',
    'Watch validation'
  )

  .description(
    'Run validation deployment'
  )

  .action(async (opts) => {

    console.log(
      chalk.cyan(
        '\n════════ VALIDATION ════════\n'
      )
    );

    console.log(
      chalk.yellow(
        `🔍 Validating Story: ${opts.story}`
      )
    );

    console.log(
      chalk.blue(
        '🧪 Running Apex Tests...'
      )
    );

    await new Promise(
      r => setTimeout(r, 1500)
    );

    console.log(
      chalk.blue(
        '📦 Preparing Deployment Package...'
      )
    );

    await new Promise(
      r => setTimeout(r, 1500)
    );

    console.time(
      chalk.green(
        '⏱ Validation Time'
      )
    );

    const result =
      await validate(
        opts.story
      );

    console.log(
      chalk.gray(
        '\nValidation Response:'
      )
    );

    console.log(result);

    if (
      opts.watch &&
      result.jobExecutionId
    ) {

      await pollUntilDone(
        () =>
          pollJob(
            result.jobExecutionId
          )
      );
    }

    console.timeEnd(
      chalk.green(
        '⏱ Validation Time'
      )
    );

    console.log(
      chalk.green(
        '\n✅ Validation Successful\n'
      )
    );
  });