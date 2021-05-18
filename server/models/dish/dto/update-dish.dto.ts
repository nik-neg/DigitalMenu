export default class UpdateDishDTO {
  readonly name: string;
  readonly price: number;
  readonly imagePath: string;
  restaurant: string;
  menu: string; // update only for one menu per request
  dish: string;

  constructor(name: string, price: number, imagePath: string, restaurant: string, menus: string, dish: string) {
    this.name = name;
    this.price = price;
    this.imagePath = imagePath;
    this.restaurant = restaurant;
    this.menu = menus;
    this.dish = dish;
  }
}