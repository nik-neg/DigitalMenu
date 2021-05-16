export default class UpdateDishDTO {
  readonly name: string;
  readonly price: number;
  readonly imagePath: string;
  restaurant: string;
  menu: string;
  dish: string;

  constructor(name: string, price: number, imagePath: string, restaurant: string, menu: string, dish: string) {
    this.name = name;
    this.price = price;
    this.imagePath = imagePath;
    this.restaurant = restaurant;
    this.menu = menu;
    this.dish = dish;
  }
}