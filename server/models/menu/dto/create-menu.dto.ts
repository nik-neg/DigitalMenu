export default class MenuDTO {
  readonly name: string;
  readonly restaurant: string
  readonly price: number

  constructor(name: string, restaurant: string, price: number) {
    this.name = name;
    this.restaurant = restaurant;
    this.price = price;
  }
}
