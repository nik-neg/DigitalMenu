import Restaurant from '../models/Restaurant';

export async function createRestaurant (req, res) {
  const { name, location } = JSON.parse(req.body);
  const restaurant = new Restaurant({
    name,
    location
  });
  try {
    const saveReponse = await restaurant.save();
    res.statusCode = 201;
    res.end(JSON.stringify(saveReponse));
  } catch(e) {
    console.log(e);
  }
}