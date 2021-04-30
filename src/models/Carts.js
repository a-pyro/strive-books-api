import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const CartSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    status: { type: String, enum: ['active', 'expired', 'paid'] },
  },
  { timestamps: true }
);

export default model('Cart', CartSchema);
