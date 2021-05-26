import IMenu from '../interfaces/imenu';
import IDish from '../../dish/interfaces/idish';

export class Menu implements IMenu {
  _id?: string;

  name?: string;

  price?: number;

  restaurant?: string;

  dishes?: IDish [];

  constructor(_id?: string, name?: string, price?: number, restaurant?: string) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.dishes = [];
  }
}
