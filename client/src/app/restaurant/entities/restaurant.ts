import IRestaurant from '../interfaces/irestaurant';
export default class Restaurant implements IRestaurant{
  name?: string;
  location?: string;
  menus: string [];
  dishes: string [];

  constructor(name?: string, location?: string) {
    this.name = name;
    this.location = location;
    this.menus = [];
    this.dishes = [];
  }

  static parse(data: any) {
    return Object.assign(new Restaurant(), data);
  }
}
