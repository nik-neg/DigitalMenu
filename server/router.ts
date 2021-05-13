import { createRestaurant } from './controllers/restaurant.controller'
export default function router(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    console.log('GET: save message');
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      res.write(JSON.parse(data).greeting);
      res.end();
    });
  } else if (req.method === 'GET') {
    console.log('GET');
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      res.write(JSON.parse(data).greeting);
      res.end();
    });
  } else if (req.method === 'POST') {
    console.log('POST');
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      res.write(data);
      req.body = data;
      createRestaurant(req, res);
      res.end();
    });
  }
}
