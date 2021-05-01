import ErrorResponse from '../utils/errorResponse.js';
import { fetchProducts, writeProducts } from '../utils/fsUtils.js';
import { createCSV } from '../utils/csv/csv.js';
import { generatePDF } from '../utils/pdf/index.js';
import { asyncPipeline } from '../utils/streams/pipleline.js';
import ProductModel from '../models/Products.js';
import mongoose from 'mongoose';
import q2m from 'query-to-mongo';

// @desc    Get all products by query
//& @route   GET /products? ✅
export const getProductsByQuery = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length > 0) {
      const query = q2m(req.query);
      const total = await ProductModel.countDocuments(query.criteria);
      console.log(query.criteria);
      console.log(query.options);

      const products = await ProductModel.find(
        {
          name: {
            $regex: new RegExp(query.criteria.name, 'i'),
          },
        },
        query.options.fields
      )
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort);

      res.status(200).send({
        success: true,
        links: query.links('/products', total),
        total,
        data: products,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc    Get all products
//& @route   GET /products ✅
export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    res
      .status(200)
      .send({ success: true, count: `${products.length}`, data: products });
  } catch (error) {
    next(error);
  }
};
// @desc    Get a product
// @route   GET /products/:id  ✅
export const getProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.status(201).send(product);
    } else {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    add product
//& @route   POST /products ✅
export const addProduct = async (req, res, next) => {
  try {
    const newProd = { ...req.body };
    const savedProd = await ProductModel.create(newProd);
    const { _id } = savedProd;
    res.status(201).send({ success: true, _id: _id });
  } catch (error) {
    return next(error);
  }
};

// @desc    modify  product
// @route   PUT /products/:id
export const modifyProduct = async (req, res, next) => {
  try {
    let modifiedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      }
    );
    if (modifiedProduct) {
      res.status(200).send(modifiedProduct);
    } else {
      return next(new ErrorResponse('resource not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    delete product
//& @route   DELETE /products/:id ✅

export const deleteProduct = async (req, res, next) => {
  try {
    const prod = await ProductModel.findByIdAndDelete(req.params.id);
    if (!prod) {
      return next(new ErrorResponse('resource not found', 404));
    }
    res.status(200).send({ success: true, message: 'product removed' });
  } catch (error) {
    next(error);
  }
};

// REVIEWS--------------------------------------

// @desc    add reviews for a product
//& @route   POST /products/:id/reviews ✅
export const postReviewOnProductId = async (req, res, next) => {
  try {
    const rev = { ...req.body };
    const savedRev = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: rev,
        },
      },
      { runValidators: true, new: true, projection: { reviews: 1 } }
    );

    res.status(201).send({ success: true, data: savedRev });
  } catch (error) {
    next(error);
  }
};
// GET products/:id/reviews
export const getProductReviews = async (req, res, next) => {
  try {
    // deconstructed reviews object uses mongoose method findbyId with Product id from the params.
    const { reviews } = await ProductModel.findById(req.params.id, {
      reviews: 1,
      _id: 0,
    });

    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// PUT products/:id/reviews/:revId
export const modifyReview = async (req, res, next) => {
  try {
    const modifiedReview = await ProductModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
        'reviews._id': mongoose.Types.ObjectId(req.params.revId),
      },
      { $set: { 'reviews.$': req.body } }, // The concept of the $ is pretty similar as having something like const $ = array.findIndex(item) => item._id === req.params.reviewId)
      {
        runValidators: true,
        new: true,
      }
    );

    if (modifiedReview) {
      res.status(201).send(modifiedReview);
    } else {
      next(new ErrorResponse('resource not found', 404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// DELETE products/:id/reviews/:revId
export const deleteReview = async (req, res, next) => {
  try {
    const modifiedReview = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(req.params.revId) },
        },
      },
      {
        new: true,
      }
    );
    if (modifiedReview) {
      res.status(202).send(modifiedReview);
    } else {
      next(new ErrorResponse('resource not found', 404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

///::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ========== OTHERS ================
///::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// @desc    GET product pdf
// @route   GET /products/:id/pdf

export const getProductPDF = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id, { reviews: 0 });
    console.log(product);
    if (product) {
      const sourceStream = await generatePDF(product);
      res.attachment('data.pdf');
      await asyncPipeline(sourceStream, res);
      res.send('ciao');
    } else {
      next(new ErrorResponse('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get  products CSV
// @route   GET /products/exportToCSV
export const getProductsCsv = async (req, res, next) => {
  try {
    res.attachment('products.csv');
    await createCSV(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// @desc    add image to product
// @route   POST /products/:id/upload
export const uploadProductPic = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(req.params.id, {
      imageUrl: req.file.path,
    });
    if (product) {
      res.status(200).send({ success: true, data: product });
    } else {
      next(new ErrorResponse('Product not found', 404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
