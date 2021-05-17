import IMenu from '../interfaces/imenu';
export default class Menu implements IMenu {
  name: string;
  price: number;
  restaurant: string;
  dishes: string [];
  constructor(name: string, price: number, restaurant: string) {
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.dishes = [];
  }
}
