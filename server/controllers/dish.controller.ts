import Validator from 'validatorjs';
import mongoose from 'mongoose';
import Dish from '../models/dish/Dish';
import DishDTO from '../models/dish/dto/create-dish.dto';
import UpdateDishDTO from '../models/dish/dto/update-dish.dto';

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
        menus: [requestObject.menuId],
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
const helperUpdateMenuRelation = async (
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
) => {
  const menu = await Menu.findOne({ _id: menuId }).exec();
  if (menu) {
    menu.dishes.push(dishId);
    await menu.save();
  }
};

// validation rules for update-dish-dto
const updateDishRules = {
  name: 'required|string',
  price: 'required|numeric',
  imagePath: 'required|string',
  restaurantId: 'required|string',
  menuId: 'required|string',
  dishId: 'required|string',

};

export async function updateDish(req: any, res: any) {
  const requestObject = req.body;
  const validation = validateInput(requestObject, updateDishRules);
  try {
    if (validation.passes()) {
      const dto = new UpdateDishDTO(
        requestObject.name,
        requestObject.price,
        requestObject.imagePath,
        requestObject.restaurantId,
        requestObject.menuId,
        requestObject.dishId
      );
      const updatedMenu = await Dish.findByIdAndUpdate(dto.dish, {
        name: dto.name,
        price: dto.price,
        imagePath: dto.imagePath,
      },
      { new: true }).exec();
      res.statusCode = 200;
      res.end(JSON.stringify(updatedMenu));
    } else {
      throw new Error('invalid parameter');
    }
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not update menu' }));
  }
}