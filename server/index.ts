import * as http from 'http'

import routeObj from './router';

const hostname = 'localhost';
const port = 3000;

async function bootstrap() {
  const server = http.createServer((req, res) => {
    routeObj(req, res);
  });
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });
}
bootstrap();

