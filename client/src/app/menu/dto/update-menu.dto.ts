
export default interface IUpdateMenuDTO {
  _id?: string;
  restaurant?: string
  name?: string;
  price?: string;
  dishes?: [];
}


export class UpdateMenuDTO implements IUpdateMenuDTO {
  _id?: string;
  restaurant?: string
  name?: string;
  price?: string;
  dishes?: [];

  constructor(_id?: string, restaurant?: string, name?: string, price?: string) {
    this._id = _id;
    this.restaurant = restaurant;
    this.name = name;
    this.price = price;
    this.dishes = [];
  }
}