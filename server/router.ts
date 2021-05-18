import {
  createRestaurant,
  showRestaurants,
  showMenusOfRestaurant
} from './controllers/restaurant.controller';

import {
  createMenu,
  updateMenu
} from './controllers/menu.controller'

import {
  createDish,
  updateDish
} from './controllers/dish.controller';

const asyncWrapper = async (func: Function, req: any, res: any, data?: any, idObject?: any) => {
  if (idObject) {
    for ( const key in idObject) {
      data[key] = idObject[key]
    }
  }
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
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      await asyncWrapper(showRestaurants, req, res);
    });
  } else if (req.method === 'GET' && checkRoute(req.url, 'restaurants')) {
    const restaurantId = req.url.split("/")[2];
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      data = JSON.parse(JSON.stringify({}));
      const idObject = {
        restaurantId,
      }
      await asyncWrapper(showMenusOfRestaurant, req, res, data, idObject);
    });
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
      const idObject = {
        restaurantId,
      }
      await asyncWrapper(createMenu, req, res, data, idObject);
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
      const idObject = {
        menuId,
      }
      await asyncWrapper(createDish, req, res, data, idObject);
    });
  }
  else if (req.method === 'PATCH') {
    const urlSplit = req.url.split("/");
    const restaurantId = urlSplit[2];
    const menuId = urlSplit[4];
    const dishId = urlSplit[6];
    console.log(restaurantId, menuId, dishId)
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', async () => {
      data = await JSON.parse(data);
      const idObject = {
        restaurantId,
        menuId,
        dishId,
      }
      if(dishId) {
        await asyncWrapper(updateDish, req, res, data, idObject);
      } else {
        await asyncWrapper(updateMenu, req, res, data, idObject);
      }

    });
  }
}
