export default class MenuDTO {
  readonly name: string;
  readonly price: number;
  readonly restaurant: string;

  constructor(name: string, restaurant: string, price: number) {
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
  }
}
