
interface IUpdateDishDTO {
  menuId?: string;
  menuName?: string;
  name?: string;
  price?: string;
}


export class UpdateDishDTO implements IUpdateDishDTO {
  menuId?: string;
  menuName?: string;
  name?: string;
  price?: string;

  constructor(menuId?: string, menuName?: string, name?: string, price?: string, ) {
    this.menuId = menuId;
    this.menuName = menuName;
    this.name = name;
    this.price = price;
  }
}