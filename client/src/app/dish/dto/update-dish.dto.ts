
export default interface IUpdateDishDTO {
  _id?: string;
  name?: string;
  price?: string;
  dishes?: [];
}


export class UpdateDishDTO implements IUpdateDishDTO {
  _id?: string;
  name?: string;
  price?: string;
  dishes?: [];

  constructor(_id?: string, name?: string, price?: string, restaurant?: string) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.dishes = [];
  }
}