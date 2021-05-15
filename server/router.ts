import {
  createRestaurant,
  showRestaurants
} from './controllers/restaurant.controller';

import {
  createMenu
} from './controllers/menu.controller'

import {
  createDish
} from './controllers/dish.controller';

const asyncWrapper = async (func: Function, req: any, res: any, data?: any, idKey?: string, idValue?: string, ) => {
  if (idKey) data[idKey] = idValue;
  req.body = data;
  await func(req, res);
}

const checkRoute = (route: string, start: string, end?: string) => {
  const regexStart = new RegExp("^\/" + start + "\/", "g");
  if(end) {
    const regexEnd = new RegExp(end+"$", "g");
    return regexStart.test(route) && regexEnd.test(route);
  } else {
    return regexStart.test(route);
  }
}

export default function router(req: any, res: any) {
  if (req.method === 'GET' && req.url === '/restaurants') {
    console.log("GET DEF")
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      await asyncWrapper(showRestaurants, req, res);
    });
  } else if (req.method === 'GET' && checkRoute(req.url, 'restaurants')) {
    console.log('GET MENUS');
    // res.end();
    // let data = '';
    // req.on('data', (chunk: Buffer) => {
    //   data += chunk;
    // });
    // req.on('end', () => {
    //   res.end();
    // });
  } else if (req.method === 'POST' && req.url === '/restaurants') {
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      data = await JSON.parse(data);
      await asyncWrapper(createRestaurant, req, res, data);
    });
  } else if (req.method === 'POST' && checkRoute(req.url, 'restaurants', 'menu')) {
    const restaurantId = req.url.split("/")[2];
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      data = await JSON.parse(data);
      await asyncWrapper(createMenu, req, res, data, 'restaurantId', restaurantId);
    });
  }
  else if (req.method === 'POST' && checkRoute( req.url, 'menu', 'dish')) {
    const menuId = req.url.split("/")[2];
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      data = await JSON.parse(data);
      await asyncWrapper(createDish, req, res, data, 'menuId', menuId);
    });
  }
}
