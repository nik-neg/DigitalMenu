import Validator from 'validatorjs';
import mongoose from 'mongoose';
import Dish from '../models/dish/Dish';
import DishDTO from '../models/dish/dto/create-dish.dto';
import UpdateDishDTO from '../models/dish/dto/update-dish.dto';

import Menu from '../models/menu/Menu';
import Restaurant from '../models/restaurant/Restaurant';

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
  const restaurant = [... await Restaurant.find({ menus: menuId }).exec()][0];
  if (menu && restaurant) {
    menu.dishes.push(dishId);
    await menu.save();
    restaurant.dishes.push(dishId);
    await restaurant.save();
  }
};

// validation rules for update-dish-dto
const updateDishRules = {
  restaurantId: 'required|string',
  menuId: 'required|string',
  dishId: 'required|string',
  // name: 'required|string',
  // price: 'required|numeric',
  // imagePath: 'opt|string',


};

export async function updateDish(req: any, res: any) {
  const requestObject = req.body;
  const validation = validateInput(requestObject, updateDishRules);
  try {
    if (validation.passes()) {
      const dto = new UpdateDishDTO(
        requestObject.restaurantId,
        requestObject.menuId,
        requestObject.dishId,
        requestObject.name,
        requestObject.menuName,
        requestObject.price,
      );

      // update the relation to menu:
      // 1.) find menu by name and if the dish is not in the menu list, add to new menu
      let menuUpdateResponse;
      if(dto.menuName) {
        const menu = (await Menu.find({ name: dto.menuName }).exec())[0];
        const checkIncluded = menu.dishes.filter((dish) => dish.toString() === dto.dish);
        if(checkIncluded.length < 1) {
          menuUpdateResponse = await Menu.findOneAndUpdate({ name: dto.menuName }, { $push: { dishes: dto.dish }}, { new: true }).exec();;
        }

      } else { // 2.) if name of menu is empty remove from this menu
        menuUpdateResponse = await Menu.findOneAndUpdate({ _id: dto.menu }, { $pull: { dishes: dto.dish }}, { new: true }).exec();;
        }
      // 3.) update the dish
      const updatedDish = await Dish.findByIdAndUpdate(dto.dish, {
        name: dto.name,
        price: dto.price,
      },
      { new: true }).exec();
      res.statusCode = 200;
      res.end(JSON.stringify({ dish: updatedDish, menu: menuUpdateResponse }));
    } else {
      throw new Error('invalid parameter');
    }
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not update menu' }));
  }
}

// async function helperUpdateMenuDishRelation(dto: UpdateDishDTO, included: boolean) {
//   if(!included) {
//     await Menu.findOneAndUpdate({ name: dto.menuName }, { $push: { dishes: dto.dish }})!;
//   } else {
//     await Menu.findOneAndUpdate({ _id: dto.menu }, { $pull: { dishes: dto.dish }});
//   }

// }
