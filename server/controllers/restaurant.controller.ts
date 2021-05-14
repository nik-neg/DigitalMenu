import Restaurant from '../models/restaurant/Restaurant';
import RestaurantDTO from '../models/restaurant/dto/create-restaurant.dto';

export async function createRestaurant (req: any, res: any) {
  console.log(req.body)
  // const { name, location } = req.body; //JSON.parse(req.body);

  // const dto = new RestaurantDTO(name, location);
  // console.log(dto, typeof dto.location);
  // console.log(req.body)

  // try {
  //   // throw new Error('Something bad happened');
  //   let restaurant = new Restaurant();
  //   restaurant.name = dto.name;
  //   restaurant.location = dto.location;
  //   console.log(typeof restaurant.location)

  //   const saveReponse = await restaurant.save();
  //   console.log(saveReponse)
  //   res.statusCode = 201;
  //   res.end(JSON.stringify(saveReponse));
  // } catch(e) {
  //   console.log(e);
  //   res.statusCode = 400;
  //   res.end(JSON.stringify({ message: 'Could not create user' }));
  // }
}