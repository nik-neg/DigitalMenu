import IMenu from '../interfaces/imenu';
export class Menu implements IMenu {
  // [key: string]: string | string[] | undefined | number;
  _id?: string;
  name?: string;
  price?: number;
  restaurant?: string;
  dishes: string [];
  constructor(_id?: string, name?: string, price?: number, restaurant?: string) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.dishes = [];
  }
}
