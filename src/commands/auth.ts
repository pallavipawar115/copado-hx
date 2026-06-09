import { Command } from 'commander';
import { setConfig, getConfig } from '../config';

export const authCmd = new Command('auth')
  .description('Authentication commands');

authCmd
  .command('login')
  .description('Login to Copado')
  .requiredOption('--url <url>', 'Copado API URL')
  .requiredOption('--token <token>', 'Bearer token')
  .action(async (opts) => {

  setConfig({
    cicdBaseUrl: opts.url,
    bearerToken: opts.token
  });

  await fetch(
    'http://localhost:3000/session',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
  loggedIn: true,
  user: "Pallavi",
  environment: "Sandbox",
  lastAction: "Login Successful",
  lastUpdated: new Date().toLocaleString()
})
    }
  );

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
  .action(async () => {

  setConfig({
    cicdBaseUrl: '',
    bearerToken: ''
  });

  await fetch(
    'http://localhost:3000/session',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
  loggedIn: false,
  user: "",
  environment: "",
  lastAction: "Logged Out",
  lastUpdated: new Date().toLocaleString()
})
    }
  );

  console.log('✅ Logged out');
});