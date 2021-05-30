import Validator from 'validatorjs';
import Menu from '../models/menu/Menu';
import MenuDTO from '../models/menu/dto/create-menu.dto';
import UpdateMenuDTO from '../models/menu/dto/update-menu-dto';
import Restaurant from '../models/restaurant/Restaurant';

import mongoose from 'mongoose';

// validation rules for create-menu-dto
const rules = {
  name: 'required|string',
  price: 'required|numeric',
  restaurantId: 'required|string',
};
const validateInput = (obj: Object, rules: any) => new Validator(obj, rules);

export async function createMenu(req: any, res: any) {
  const requestObject = req.body;
  const validation = validateInput(requestObject, rules);
  try {
    if (validation.passes()) {
      const dto = new MenuDTO(requestObject.name, requestObject.restaurantId, requestObject.price);
      const menu = new Menu({
        name: dto.name,
        price: dto.price,
        restaurant: dto.restaurant
      });
      const saveMenuReponse = await menu.save();
      await helperUpdateRestauranRelation(requestObject.restaurantId, saveMenuReponse._id);
      res.statusCode = 201;
      res.end(JSON.stringify(saveMenuReponse));
    } else {
      throw new Error('invalid parameter');
    }
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not create menu' }));
  }
}

const helperUpdateRestauranRelation =
async (
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }
  ) => {
  const restaurant = await Restaurant.findOne({_id: restaurantId }).exec();
  if (restaurant) {
    restaurant.menus.push(menuId);
    await restaurant.save();
  }
}

// validation rules for create-menu-dto
const updateRules = {
  name: 'required|string',
  price: 'required|numeric',
  restaurantId:'required|string',
  menuId:'required|string',
  dishes: 'required|array'
};

export async function updateMenu(req: any, res: any) {
  const requestObject = req.body;
  const validation = validateInput(requestObject, updateRules);
  try {
    if (validation.passes()) {
      const dto = new UpdateMenuDTO(requestObject.name, requestObject.price, requestObject.restaurantId, requestObject.menuId, requestObject.dishes);
      const updatedMenu = await Menu.findByIdAndUpdate(dto.menu, {
        name: dto.name,
        price: dto.price,
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
