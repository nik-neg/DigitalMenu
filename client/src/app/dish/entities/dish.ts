import IDish from '../interfaces/idish';

export class Dish implements IDish {
  name: string;

  price: number;

  imagePath: string;

  menus: string [];

  restaurant: string;

  constructor(name: string, price: number, imagePath: string, menus: string [], restaurant: string) {
    this.name = name;
    this.price = price;
    this.imagePath = imagePath;
    this.menus = menus;
    this.restaurant = restaurant;
  }
}
