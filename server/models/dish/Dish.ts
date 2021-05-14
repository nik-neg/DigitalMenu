import mongoose from 'mongoose';

export interface IDish extends mongoose.Document {
  name: string;
  price: number;
  location: string;
  menues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }];
}

export const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  menues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
});

const Dish = mongoose.model<IDish>('Dish', DishSchema);
export default Dish;
