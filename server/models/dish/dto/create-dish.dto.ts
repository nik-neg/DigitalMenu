export default class MenuDTO {
  readonly name: string;
  readonly price: number;
  readonly imagePath: string;
  menus: string [];

  constructor(name: string, price: number, imagePath: string) {
    this.name = name;
    this.price = price;
    this.imagePath = imagePath;
    this.menus = [];
  }
}
