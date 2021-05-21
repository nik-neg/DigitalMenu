import IRestaurant from '../interfaces/irestaurant';
export class Restaurant implements IRestaurant{
  _id?: string;
  name?: string;
  location?: string;
  imagePath?: string;
  slogan: string;
  menus: string [];
  dishes: string [];

  constructor(_id?: string, name?: string, location?: string) {
    this._id = _id;
    this.name = name;
    this.location = location;
    this.imagePath = '';
    this.slogan = '';
    this.menus = [];
    this.dishes = [];
  }

  static parse(data: any) {
    return Object.assign(new Restaurant(), data);
  }
}
