export default class UpdateMenuDTO {
  readonly name: string;
  readonly price: number;
  readonly restaurant: string;
  readonly menu: string;

  constructor(name: string, price: number, restaurant: string, menu: string) {
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.menu = menu;
  }
}