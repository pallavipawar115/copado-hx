#!/usr/bin/env node

import { Command } from 'commander';

import { authCmd } from './commands/auth';
import { storyCmd } from './commands/story';
import { deployCmd } from './commands/deploy';
import { commitCmd } from './commands/commit';
import { promoteCmd } from './commands/promote';
import { validateCmd } from './commands/validate';
import { envsCmd } from './commands/envs';
import { jobsCmd } from './commands/jobs';
import { testCmd } from './commands/test';
import { aiCmd } from './commands/ai';
import { pipelineCmd } from './commands/pipeline';

const program = new Command();

program
  .name('copado-hx')
  .description(
    'Headless CLI for Copado'
  )
  .version('1.0.0');

program.addCommand(authCmd);
program.addCommand(storyCmd);
program.addCommand(deployCmd);
program.addCommand(commitCmd);
program.addCommand(promoteCmd);
program.addCommand(validateCmd);
program.addCommand(envsCmd);
program.addCommand(jobsCmd);
program.addCommand(testCmd);
program.addCommand(aiCmd);
program.addCommand(pipelineCmd);
program.parse();