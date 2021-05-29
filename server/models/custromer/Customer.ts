import mongoose from 'mongoose';
export interface ICustomer extends mongoose.Document {
  name: string;
  email: string;
  isAdmin: boolean;
  restaurants?: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }];
}

export const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
});

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
export default Customer;
