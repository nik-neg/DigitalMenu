export default class UpdateMenuDTO {
  readonly name: string;
  readonly price: number;
  readonly restaurant: string;
  readonly menu: string;
  readonly dishes: string [];

  constructor(name: string, price: number, restaurant: string, menu: string, dishes: string []) {
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.menu = menu;
    this.dishes = dishes;
  }
}