import Validator from 'validatorjs';
import Dish from '../models/dish/Dish';
import DishDTO from '../models/dish/dto/create-dish.dto';

// validation rules for create-restaurant-dto
const rules = {
  name: 'required|string',
  price: 'required|numeric',
  imagePath: 'required|string',
  menu: 'required|string',
};
const validateInput = (obj: Object, rules: any) => new Validator(obj, rules);

export async function createDish(req: any, res: any) {
  const requestObject = req.body;
  console.log(requestObject)
  // const validation = validateInput(requestObject, rules);
  // try {
  //   if (validation.passes()) {
  //     const dto = new DishDTO(requestObject.name, requestObject.restaurantId);
  //     const menu = new Dish({
  //       name: dto.name,
  //       restaurant: dto.restaurant
  //     });
  //     const saveReponse = await menu.save();
  //     res.statusCode = 201;
  //     res.end(JSON.stringify(saveReponse));
  //   } else {
  //     throw new Error('invalid parameter');
  //   }
  // } catch (error) {
  //   res.statusCode = 400;
  //   res.end(JSON.stringify({ error: 'Could not create menu' }));
  // }
}
