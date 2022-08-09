import 'dotenv/config';
import { KApp } from '@kustomer/apps-server-sdk';

import pkg from './package.json';
import changelog from './changelog.json';

if (!process.env.BASE_URL) {
  throw new Error('baseUrl is required');
}

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  throw new Error('clientId and clientSecret are required');
}

const app = new KApp({
  app: pkg.name,
  version: pkg.version,
  title: 'my_new_test',
  visibility: 'public',
  description: '',
  dependencies: [],
  default: false,
  system: false,
  url: process.env.BASE_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  iconUrl: `${process.env.BASE_URL}/assets/icon.png`,
  env: 'qa',
  changelog,
  roles: [
    'org.user.customer.read',
    'org.user.customer.write',
    'org.user.message.read',
    'org.permission.customer.read',
    'org.permission.customer.create',
    'org.permission.customer.update',
    'org.permission.message.read'
  ],
  appDetails: {
    appDeveloper: {
      name: 'Kustomer',
      website: 'https://kustomer.com',
      supportEmail: 'support@kustomer.com',
    },
    externalPlatform: {
      name: 'my_new_test',
      website: 'https://my_new_test.com',
    },
  },
  screenshots: []
});

(async () => {
  try {
    await app.start({ port: +(process.env.PORT || 3000) });
  } catch (err) {
    app.log.error(JSON.stringify(err, undefined, 2));
  }
})();