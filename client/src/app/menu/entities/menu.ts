import IMenu from '../interfaces/imenu';
import { Dish } from '../../dish/entities/dish';

export class Menu implements IMenu {
  [key: string]: any;

  _id?: string;

  name?: string;

  price?: number;

  restaurant?: string;

  dishes: Dish []

  constructor(_id?: string, name?: string, price?: number, restaurant?: string) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.dishes = [];
  }
}
