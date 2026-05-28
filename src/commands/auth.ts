import { Command } from 'commander';
import { setConfig, getConfig } from '../config';

export const authCmd = new Command('auth')
  .description('Authentication commands');

authCmd
  .command('login')
  .description('Login to Copado')
  .requiredOption('--url <url>', 'Copado API URL')
  .requiredOption('--token <token>', 'Bearer token')
  .action((opts) => {

    setConfig({
      cicdBaseUrl: opts.url,
      bearerToken: opts.token
    });

    console.log('✅ Login successful');
  });

authCmd
  .command('status')
  .description('Check login status')
  .action(() => {

    const config = getConfig();

    console.log('Current Config:');

    console.log(config);
  });

authCmd
  .command('logout')
  .description('Logout')
  .action(() => {

    setConfig({
      cicdBaseUrl: '',
      bearerToken: ''
    });

    console.log('✅ Logged out');
  });