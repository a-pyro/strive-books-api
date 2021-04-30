import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const CartSchema = new Schema(
  {
    products: [
      { productId: String, name: String, price: Number, quantity: Number },
    ],
    status: { type: String, enum: ['active', 'expired', 'paid'] },
  },
  { timestamps: true }
);

export default model('Cart', CartSchema);
