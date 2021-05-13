import Restaurant from '../models/Restaurant';

export async function createRestaurant (req, res) {
  const { name, location } = JSON.parse(req.body);
  const restaurant = new Restaurant({
    name,
    location
  });
  try {
    await restaurant.save();
  } catch(e) {
    console.log(e);
  }
}