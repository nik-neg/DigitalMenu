import { createRestaurant } from './controllers/restaurant.controller';

import RestaurantDTO from './models/restaurant/dto/create-restaurant.dto';

import Validator from 'validatorjs';

export default function router(req: any, res: any) {
  if (req.method === 'GET' && req.url === '/') {
    console.log('GET: save message');
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', () => {
      res.write(JSON.parse(data).greeting);
      res.end();
    });
  } else if (req.method === 'GET') {
    console.log('GET');
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', () => {
      res.write(JSON.parse(data).greeting);
      res.end();
    });
  } else if (req.method === 'POST') {
    console.log('POST');
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', () => {
      data = JSON.parse(data);

      let rules = {
        name: 'required|string',
        location: 'required|string',
      };

      let validation = new Validator(data, rules);
      console.log(validation.passes()); // true

      // const dto = new RestaurantDTO(name, location);
      // req.body = dto;
      // createRestaurant(req, res);
    });
  }
}
