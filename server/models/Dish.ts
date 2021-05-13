import mongoose from 'mongoose';

export interface IDish extends mongoose.Document {
  name: string;
  location: string;
};

export const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
});

const Dish = mongoose.model<IDish>('Dish', DishSchema);
export default Dish;