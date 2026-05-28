import Table from 'cli-table3';
import chalk from 'chalk';

export function output(
  data: any,
  jsonMode = false
) {

  if (
    jsonMode ||
    !process.stdout.isTTY
  ) {

    process.stdout.write(
      JSON.stringify(
        data,
        null,
        2
      ) + '\n'
    );

    return;
  }

  if (
    Array.isArray(data)
  ) {

    if (data.length === 0) {

      console.log(
        chalk.yellow(
          'No records found'
        )
      );

      return;
    }

    const keys =
      Object.keys(data[0]);

    const table =
      new Table({
        head: keys.map(key =>
          chalk.cyan(key)
        )
      });

    data.forEach(row => {

      table.push(
        keys.map(
          key => row[key]
        )
      );

    });

    console.log(
      table.toString()
    );

  } else {

    console.log(
      chalk.green('SUCCESS')
    );

    console.log(
      JSON.stringify(
        data,
        null,
        2
      )
    );
  }
}