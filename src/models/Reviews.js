import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    rating: {
      type: Number,
      min: [1, 'min rating is 1'],
      max: [5, 'max rating is 5'],
      required: [true, 'Please add a price'],
    },
  },
  { timestamps: true }
);
export default ReviewSchema;
