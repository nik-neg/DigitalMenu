import * as mongoose from 'mongoose';

export interface IRestaurant extends mongoose.Document {
  name: string;
  location: string;
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' };
  menu?: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }];
}

export const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
});

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
export default Restaurant;
