import {
  createRestaurant,
  showRestaurants
} from './controllers/restaurant.controller';

const asyncWrapper = async (func: Function, req: any, res: any, data?: Object) => {
  req.body = data;
  await func(req, res);
}

const createDishUrl = "/restaurants/609eeeb25b97930b9382367e/menu";
const createDishStart  = /^\/restaurants/.test(createDishUrl);
const createDishEnd = /menu$/.test(createDishUrl);

const checkRoute = (start: string, end: string, route: string) => {
  const regexStart = new RegExp("^\/" + start + "\/", "g");
  // console.log(regexStart.test(route))
  const regexEnd = new RegExp(end+"$", "g");
  // console.log(regexEnd.test(route))
  return regexStart.test(route) && regexEnd.test(route);
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
  } else if (req.method === 'GET') {
    console.log('GET');
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk;
    });
    req.on('end', () => {
      res.end();
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
  } else if (req.method === 'POST' && checkRoute('restaurants', 'menu', req.url)) { // && req.url === '/restaurants/:id/menu'
    console.log('CREATE MENU');
    var path = req.url.split("/")[2];
    console.log(path)
    // let data = '';
    // req.on('data', (chunk: Buffer) => {
    //   data += chunk;
    // });
    // req.on('end', async () => {
    //   req.body = await JSON.parse(data); //data !== DEFAULT_REQUEST ? await JSON.parse(data) : 'DEFAULT_REQUEST';
    //   createRestaurant(req, res);
    // });
  }
}
