export default class RestaurantDTO {
  readonly name: string;
  readonly location: string;
  readonly slogan: string;
  readonly imagePath: string;
  readonly isAdmin: boolean;

  constructor(name: string, location: string, slogan: string, imagePath: string, isAdmin: boolean) {
    this.name = name;
    this.location = location;
    this.slogan = slogan;
    this.imagePath = imagePath;
    this.isAdmin = isAdmin;
  }
}
