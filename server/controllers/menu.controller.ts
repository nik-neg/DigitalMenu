import Validator from 'validatorjs';
import Menu from '../models/menu/Menu';
import MenuDTO from '../models/menu/dto/create-menu.dto';

// validation rules for create-menu-dto
const rules = {
  name: 'required|string',
  restaurantId: 'required|string',
};
const validateInput = (obj: Object, rules: any) => new Validator(obj, rules);

export async function createMenu(req: any, res: any) {
  const requestObject = req.body;
  const validation = validateInput(requestObject, rules);
  try {
    if (validation.passes()) {
      const dto = new MenuDTO(requestObject.name, requestObject.restaurantId);
      const menu = new Menu({
        name: dto.name,
        restaurant: dto.restaurant
      });
      const saveReponse = await menu.save();
      res.statusCode = 201;
      res.end(JSON.stringify(saveReponse));
    } else {
      throw new Error('invalid parameter');
    }
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Could not create menu' }));
  }
}
