import * as mongoose from 'mongoose';

export interface IRestaurant extends mongoose.Document {
  name: string;
  location: string;
};

export const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
export default Restaurant;