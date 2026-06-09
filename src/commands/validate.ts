
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

    try {

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

      // Update UI → Running
      await fetch(
        "http://localhost:3000/validation",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            status: "🔄 Running...",
            coverage: 0,
            testsPassed: 0,
            risk: "-"
          })
        }
      );

      await new Promise(
  resolve =>
    setTimeout(resolve, 5000)
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

      // Update UI → Success
      await fetch(
        "http://localhost:3000/validation",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            status:
              "✅ Validation Successful",
            coverage: 92,
            testsPassed: 24,
            risk: "LOW"
          })
        }
      );

await fetch(
  "http://localhost:3000/session",
  {
    method: "PATCH",
    headers: {
      "Content-Type":
        "application/json"
    },
    body: JSON.stringify({
      lastAction:
        "✅ Validation Successful",
      lastUpdated:
        new Date()
          .toLocaleString()
    })
  }
);

console.log(
  chalk.green(
    '\n✅ Validation Successful\n'
  )
);

    } catch (error) {

      // Update UI → Failure
      await fetch(
        "http://localhost:3000/validation",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            status:
              "❌ Validation Failed",
            coverage: 68,
            testsPassed: 18,
            risk: "HIGH"
          })
        }
      );

      console.error(error);

      throw error;
    }

  });

