import * as mongoose from 'mongoose';
export interface IRestaurant extends mongoose.Document {
  name: string;
  location: string;
  slogan: string;
  imagePath: string;
  isAdmin: boolean;
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' };
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }];
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
}

export const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  slogan: { type: String, required: true },
  imagePath: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
});

const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
export default Restaurant;
