import Validator from 'validatorjs';
import Restaurant from '../models/restaurant/Restaurant';
import RestaurantDTO from '../models/restaurant/dto/create-restaurant.dto';

// validation rules for create-restaurant-dto
const rules = {
  name: 'required|string',
  location: 'required|string',
  slogan: 'required|string',
  imagePath: 'required|string',
};
const validateInput = (obj: Object, rules: any) => new Validator(obj, rules);

export async function createRestaurant(req: any, res: any) {
  const requestObject = req.body;
  const validation = validateInput(requestObject, rules);
  try {
    if (validation.passes()) {
      const { name, location, slogan, imagePath, isAdmin } = requestObject;
      const dto = new RestaurantDTO(name, location, slogan, imagePath, isAdmin);
      const restaurant = new Restaurant({
        name: dto.name,
        location: dto.location,
        slogan: dto.slogan,
        imagePath: dto.imagePath,
        isAdmin: dto.isAdmin
      });
      const saveReponse = await restaurant.save();
      res.statusCode = 201;
      res.end(JSON.stringify(saveReponse));
    } else {
      throw new Error('invalid parameter');
    }
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not create restaurant' }));
  }
}

export async function showRestaurants(req: any, res: any) {
  try {
    const findReponse = await Restaurant.
    find()
    .populate({
      path: 'menus',
      populate: { path: 'dishes' },
    })
    .exec();
    res.statusCode = 200;
    res.end(JSON.stringify(findReponse));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not find any restaurants' }));
  }
}

export async function showMenusOfRestaurant(req: any, res: any) {
  const { restaurantId } = req.body;
  try {
    const findRestaurantReponse = await Restaurant
      .findOne({ _id: restaurantId })
      .populate({
        path: 'menus',
        populate: { path: 'dishes' },
      })
      .exec();
    res.statusCode = 200;
    res.end(JSON.stringify(findRestaurantReponse));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not find the restaurants' }));
  }
}
