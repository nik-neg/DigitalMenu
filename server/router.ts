import { createRestaurant } from './controllers/restaurant.controller';

import RestaurantDTO from './models/restaurant/dto/create-restaurant.dto';

const DEFAULT_REQUEST = '1:1';

export default function router(req: any, res: any) {
  if (req.method === 'GET' && req.url === '/') {
    console.log('GET: save message');
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', () => {
      // res.write(JSON.parse(data).greeting);
      res.end();
    });
  } else if (req.method === 'GET') {
    console.log('GET');
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', () => {
      // res.write(JSON.parse(data).greeting);
      res.end();
    });
  } else if (req.method === 'POST') {
    console.log('POST');
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      req.body = data !== DEFAULT_REQUEST ? await JSON.parse(data) : 'DEFAULT_REQUEST';
      createRestaurant(req, res);
    });
  }
}

// const asyncWrapper = async (func: Function, req: any, res: any, data: Object) => {
//   req.body = data;
//   await func(req, res);
// }
