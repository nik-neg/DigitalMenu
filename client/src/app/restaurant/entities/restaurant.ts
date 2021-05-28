import IRestaurant from '../interfaces/irestaurant';
import { Dish } from '../../dish/entities/dish';
import { Menu } from '../../menu/entities/menu';

export class Restaurant implements IRestaurant {
  [key: string]: any;

  _id?: string;

  name?: string;

  location?: string;

  imagePath?: string;

  slogan: string;

  isAdmin: boolean = false;

  menus: Menu [];

  dishes: Dish [];

  constructor(_id?: string, name?: string, location?: string, isAdmin?: boolean) {
    this._id = _id;
    this.name = name;
    this.location = location;
    this.imagePath = '';
    this.slogan = '';
    this.isAdmin = isAdmin ? isAdmin : false;
    this.menus = [];
    this.dishes = [];
  }

  static parse(data: any) {
    return Object.assign(
      new Restaurant(),
      data,
    );
  }
}
