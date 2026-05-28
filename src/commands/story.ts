import { Command } from 'commander';

import {
  listStories,
  getStory
} from '../api/cicd';

import {
  setConfig,
  getConfig
} from '../config';

export const storyCmd =
  new Command('story')

  .description(
    'User story management'
  );


// --------------------------------
// story list
// --------------------------------

storyCmd
  .command('list')

  .description(
    'List user stories'
  )

  .action(async () => {

    const stories =
      await listStories();

    console.log(stories);
  });


// --------------------------------
// story set
// --------------------------------

storyCmd
  .command('set')

  .requiredOption(
    '--id <id>',
    'Story ID'
  )

  .description(
    'Set current story context'
  )

  .action((opts: any) => {

    setConfig({
      currentStory:
        opts.id
    });

    console.log(
      `✅ Current story set to ${opts.id}`
    );
  });


// --------------------------------
// story show
// --------------------------------

storyCmd
  .command('show')

  .description(
    'Show current story'
  )

  .action(async () => {

    const config =
      getConfig();

    if (
      !config.currentStory
    ) {

      console.log(
        'No story selected'
      );

      return;
    }

    const story =
      await getStory(
        config.currentStory
      );

    console.log(story);
  });