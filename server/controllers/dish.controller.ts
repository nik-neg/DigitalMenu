import Validator from 'validatorjs';
import Dish from '../models/dish/Dish';
import DishDTO from '../models/dish/dto/create-dish.dto';

import mongoose from 'mongoose';
import Menu from '../models/menu/Menu';

// validation rules for create-dish-dto
const rules = {
  name: 'required|string',
  price: 'required|numeric',
  imagePath: 'required|string',
  menuId: 'required|string',
};
const validateInput = (obj: Object, rules: any) => new Validator(obj, rules);

export async function createDish(req: any, res: any) {
  const requestObject = req.body;
  const validation = validateInput(requestObject, rules);
  try {
    if (validation.passes()) {
      const dto = new DishDTO(requestObject.name, requestObject.price, requestObject.imagePath, requestObject.menuId);
      const dish = new Dish({
        name: dto.name,
        price: dto.price,
        imagePath: dto.imagePath,
        menus: [requestObject.menuId]
      });
      const saveDishReponse = await dish.save();
      helperUpdateMenuRelation(requestObject.menuId, saveDishReponse._id);
      res.statusCode = 201;
      res.end(JSON.stringify(saveDishReponse));
    } else {
      throw new Error('invalid parameter');
    }
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not create dish' }));
  }
}
const helperUpdateMenuRelation =
async (
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }
  ) => {
  const menu = await Menu.findOne({_id: menuId }).exec();
  if (menu) {
    menu.dishes.push(dishId);
    await menu.save();
  }
}
