import mongoose from 'mongoose';

export interface IMenu extends mongoose.Document {
  name: string;
  location: string;
};

export const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
});

const Menu = mongoose.model<IMenu>('Menu', MenuSchema);
export default Menu;