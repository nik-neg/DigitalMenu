export default class MenuDTO {
  readonly name: string;
  readonly restaurant: string

  constructor(name: string, restaurant: string) {
    this.name = name;
    this.restaurant = restaurant;
  }
}
