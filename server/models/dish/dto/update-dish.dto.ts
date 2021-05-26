export default class UpdateDishDTO {
  readonly restaurant: string;
  readonly menu: string; // update only for one menu per request
  readonly dish: string;
  readonly name?: string;
  readonly price?: number;

  constructor(restaurant: string, menus: string, dish: string, name?: string, price?: number) {
    this.restaurant = restaurant;
    this.menu= menus;
    this.dish = dish;
    this.name = name;
    this.price = price;
  }
}