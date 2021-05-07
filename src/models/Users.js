import mongoose from 'mongoose';
import { CartSchema } from './Carts.js';
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      match: [/.+\@.+\..+/, 'please insert valid email adddress'],
    },
    age: {
      type: Number,
      min: [18, 'You are too young!'],
      default: 18,
    },
    purchaseHistory: [
      {
        id: String,
        name: String,
        price: Number,
        category: String,
        date: Date,
      },
    ],
    cart: { type: Schema.Types.Object, CartSchema },
  },
  { timestamps: true }
);
UserSchema.post('validate', function (error, doc, next) {
  if (error) {
    error.statusCode = 400;
    next(error);
  } else {
    next();
  }
});

export default model('User', UserSchema);
