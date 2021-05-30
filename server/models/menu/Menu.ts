import mongoose from 'mongoose';

export interface IMenu extends mongoose.Document {
  name: string;
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' };
  price: number;
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }];
}

export const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  price: { type: Number, required: true },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
});

const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;
