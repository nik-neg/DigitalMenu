import IDish from '../interfaces/idish';

export class Dish implements IDish {
  _id: string;
  name: string;
  price: number;
  imagePath: string;
  menus: string [];
  restaurant: string;

  constructor(_id: string, name: string, price: number, imagePath: string, menus: string [], restaurant: string) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.imagePath = imagePath;
    this.menus = menus;
    this.restaurant = restaurant;
  }
}
