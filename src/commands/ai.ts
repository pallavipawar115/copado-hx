import { Command } from 'commander';

import {
  askAgent
} from '../api/ai';

export const aiCmd =
  new Command('ai')

  .description(
    'AI Agent commands'
  );


// -----------------------------
// ai ask
// -----------------------------

aiCmd
  .command('ask')

  .requiredOption(
    '--agent <agent>',
    'Agent name'
  )

  .argument(
    '<message>'
  )

  .description(
    'Ask AI agent'
  )

  .action(
    async (
      message: string,
      opts: any
    ) => {

      const response =
        await askAgent(
          opts.agent,
          message
        );

      console.log(response);
    }
  );