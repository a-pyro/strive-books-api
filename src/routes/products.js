import { Router } from 'express';
import mongoose from 'mongoose';
import {
  modifyReview,
  deleteReview,
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
  getProductReviews,
  getProductsCsv,
  getProductPDF,
  postReviewOnProductId,
  getProductsByQuery,
  uploadProductPic,
} from '../controllers/products.js';
import multerUploadCloudinary from '../middlewares/products/pictureUpload.js';
const upload = multerUploadCloudinary();

const router = Router();

router.route('/exportToCSV').get(getProductsCsv);
// products
router.route('/').get(getProductsByQuery, getProducts).post(addProduct);
router.route('/:id').put(modifyProduct).delete(deleteProduct).get(getProduct);
router.route('/:id/upload').post(upload, uploadProductPic);

// review
router.route('/:id/reviews').post(postReviewOnProductId).get(getProductReviews);
router.route('/:id/reviews/:revId').put(modifyReview);
router.route('/:id/reviews/:revId').delete(deleteReview);

router.route('/:id/pdf').get(getProductPDF);

export default router;
