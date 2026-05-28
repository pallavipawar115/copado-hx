import ora from 'ora';

export async function pollUntilDone(
  fetchFn: () => Promise<any>
) {

  const spinner =
    ora('Starting...')
      .start();

  while (true) {

    const result =
      await fetchFn();

    if (!result) {

      spinner.fail(
        'Job not found'
      );

      return;
    }

    const status =
      (
        result.status ||
        ''
      ).toLowerCase();

    spinner.text =
      `Current Status: ${status}`;

    if (
      status === 'completed'
    ) {

      spinner.succeed(
        `Completed: ${status}`
      );

      return result;
    }

    await new Promise(
      resolve =>
        setTimeout(resolve, 2000)
    );
  }
}