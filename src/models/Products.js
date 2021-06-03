import mongoose from 'mongoose';
import ReviewSchema from './Reviews.js';
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Headline cannot be more than 50 chars'],
    },
    description: {
      type: String,
      required: [true, 'Please add a descr'],
      trim: true,
      maxlength: [100, 'description cannot be more than 50 chars'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
      trim: true,
      maxlength: [50, 'brand cannot be more than 50 chars'],
    },
    imageUrl: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },

    category: {
      type: String,
      required: [true, 'Please add a category'],
      trim: true,
      maxlength: [30, 'Headline cannot be more than 50 chars'],
    },

    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

export default model('Product', ProductSchema);
