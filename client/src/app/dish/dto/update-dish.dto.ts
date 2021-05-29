interface IUpdateDishDTO {
  menuName?: string;
  name?: string;
  price?: string;
}


export class UpdateDishDTO implements IUpdateDishDTO {
  menuName?: string;
  name?: string;
  price?: string;

  constructor(menuName?: string, name?: string, price?: string, ) {
    this.menuName = menuName;
    this.name = name;
    this.price = price;
  }
}