import IRestaurant from '../interfaces/irestaurant';
export class Restaurant implements IRestaurant{
  name: string;
  location: string;
  menus: string [];
  dishes: string [];

  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
    this.menus = [];
    this.dishes = [];
  }
}
