
interface IUpdateDishDTO {
  dishId?: string;
  menuName?: string;
  name?: string;
  price?: string;
}


export class UpdateDishDTO implements IUpdateDishDTO {
  dishId?: string;
  menuName?: string;
  name?: string;
  price?: string;

  constructor(menuId?: string, menuName?: string, name?: string, price?: string, ) {
    this.dishId = menuId;
    this.menuName = menuName;
    this.name = name;
    this.price = price;
  }
}