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

  .action(async (opts: any) => {

  setConfig({
    currentStory: opts.id
  });

  const storiesRes =
  await fetch(
    "http://localhost:3000/user-stories"
  );

const stories =
  await storiesRes.json();

const selectedStory =
  stories.find(
    (story: any) =>
      story.id === opts.id
  );

await fetch(
  "http://localhost:3000/current-story",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: opts.id
    })
  }
);

await fetch(
  "http://localhost:3000/session",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      loggedIn: true,
      user: "Pallavi",
      environment: "Sandbox",

      lastAction:
        `Story Selected: ${opts.id}`,

      lastUpdated:
        new Date()
          .toLocaleString(),

      currentStory:
        opts.id,

      currentStoryTitle:
        selectedStory?.title || "",

      currentStoryStatus:
        selectedStory?.status || ""
    })
  }
);

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