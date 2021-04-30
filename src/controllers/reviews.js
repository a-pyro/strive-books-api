import { v4 as uuidv4 } from "uuid";
import { fetchReviews, writeReviews, fetchProducts } from "../utils/fsUtils.js";

// @desc    Get all reviews
// @route   GET /reviews/:id
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();

    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
  }
};

// @desc    get review by id
// @route   POST /reviews/:id

export const getReviewsById = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();

    const findReview = reviews.find((rev) => rev._id === req.params.id);

    if (findReview) {
      res.status(200).send(findReview);
    } else {
      res.status(400).send("Review with that id not found");
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    add review
// @route   POST /reviews

export const addReview = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();

    const newReview = {
      _id: uuidv4(),
      ...req.body,
      //   productId: req.body._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    reviews.push(newReview);

    await writeReviews(reviews);

    res.status(201).send({ _id: newReview._id });
  } catch (error) {
    console.log(error);
  }
};

// @desc    modify  review
// @route   PUT /reviews/:id

// export const modifyReview = async (req, res, next) => {
//   try {
//     const reviews = await fetchReviews();

//     const findReview = reviews.filter((review) => review._id !== req.params.id);

//     const modifiedReview = {
//       _id: req.params.id,
//       ...req.body,
//       updatedAt: new Date(),
//     };

//     findReview.push(modifiedReview);

//     await writeReviews(findReview);

//     res.status(201).send("Edited successful", { _id: modifiedReview._id });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const modifyReview = async (req, res, next) => {
  try {
    const modifiedReview = await ArticleModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
        "reviews._id": mongoose.Types.ObjectId(req.params.reviewId),
      },
      { $set: { "reviews.$": req.body } }, // The concept of the $ is pretty similar as having something like const $ = array.findIndex(item) => item._id === req.params.reviewId)
      {
        runValidators: true,
        new: true,
      }
    );

    if (modifiedReview) {
      res.status(201).send(modifiedReview);
    } else {
      res.status(400).send("Product id not found");
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc    delete review
// @route   DELETE /reviews/:id

export const deleteReview = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();

    const findReview = reviews.filter((review) => review._id !== req.params.id);

    await writeReviews(findReview);

    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

export const postReviewOnProductId = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();
    const products = await fetchProducts();
    console.log(products);
    const product_id = req.params.id;

    const findProduct = products.filter(
      (product) => product._id === product_id
    );

    if (findProduct) {
      const newReview = {
        _id: uuidv4(),
        ...req.body,
        productId: product_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      reviews.push(newReview);

      await writeReviews(reviews);

      res.status(201).send({ _id: newReview._id });
    } else {
      res.status(400).send("Product id not found");
    }
  } catch (error) {
    console.log(error);
  }
};
