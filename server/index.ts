import * as http from 'http';

import * as dotenv from 'dotenv';
import router from './router';

import { connect } from './models/db';

dotenv.config({ path: `${__dirname}/.env` });
const hostname = 'localhost';
const port = 3000;

(async () => {
  try {
    connect();
    const server = http.createServer((req: http.IncomingMessage, res: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      router(req, res);
    });
    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
