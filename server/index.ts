import * as http from 'http'

import router from './router';

import { connect } from './models/db';

import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });
const hostname = 'localhost';
const port = 3000;

(async () => {
  try {
    connect();
    const server = http.createServer((req, res) => {
      router(req, res);
    });
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();


