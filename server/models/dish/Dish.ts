import mongoose from 'mongoose';
export interface IDish extends mongoose.Document {
  name: string;
  price: number;
  imagePath: string;
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }];
}

export const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imagePath: { type: String, required: true },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
});

const Dish = mongoose.model<IDish>('Dish', DishSchema);
export default Dish;
