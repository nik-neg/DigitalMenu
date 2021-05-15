export default class RestaurantDTO {
  readonly name: string;
  readonly location: string;

  constructor(name:string, location:string) {
    this.name = name;
    this.location = location;
  }
}
