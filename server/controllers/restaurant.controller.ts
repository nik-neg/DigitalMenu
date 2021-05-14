import Restaurant from '../models/restaurant/Restaurant';
import RestaurantDTO from '../models/restaurant/dto/create-restaurant.dto';

import Validator from 'validatorjs';

// validation rules for create-restaurant-dto
let rules = {
  name: 'required|string',
  location: 'required|string',
};
const validateInput = (obj: Object, rules:any) => {
  return new Validator(obj, rules);
}

export async function createRestaurant (req: any, res: any) {
  // if (req.body === 'DEFAULT_REQUEST') return;
  let requestObject = req.body
  let validation = validateInput(requestObject, rules);
  try {
    if (validation.passes()) {
      const dto = new RestaurantDTO(requestObject.name, requestObject.location);
      let restaurant = new Restaurant({
        name: dto.name,
        location: dto.location
      });
      const saveReponse = await restaurant.save();
      res.statusCode = 201;
      res.end(JSON.stringify(saveReponse));
    } else {
      throw new Error('invalid parameter');
    }
  } catch(error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not create restaurant' }));
  }
}
