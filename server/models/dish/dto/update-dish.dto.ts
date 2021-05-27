export default class UpdateDishDTO {
  readonly restaurant: string;
  readonly menu: string; // update only for one menu per request
  readonly dish: string;
  readonly name?: string;
  readonly menuName?: string;
  readonly price?: number;

  constructor(restaurant: string, menus: string, dish: string, name?: string, menuName?: string, price?: number) {
    this.restaurant = restaurant;
    this.menu= menus;
    this.dish = dish;
    this.name = name;
    this.menuName = menuName;
    this.price = price;
  }
}