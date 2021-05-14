import { IsString } from 'class-validator';



// interface IRestaurantDTO {
//   name: string,
//   location: string
// }




export default class RestaurantDTO  {
  // @IsString()
  readonly name: string;

  // @IsString()
  readonly location: string;

  constructor(name:string, location:string) {
    this.name = name;
    this.location = location;
  }
}
