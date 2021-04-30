import { Router } from 'express';
import {
  modifyReview,
  deleteReview,
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
  // uploadProductPic,
  getProductReviews,
  // getProductsByQuery,
  getProductsCsv,
  getProductPDF,
  postReviewOnProductId,
} from '../controllers/products.js';
// import { validateProduct } from '../middlewares/validation/productsValidation.js';
// import multerUploadCloudinary from '../middlewares/products/pictureUpload.js';
// import {
//   deleteReview,
//   modifyReview,
//   postReviewOnProductId,
// } from '../controllers/reviews.js';
// const upload = multerUploadCloudinary();
const router = Router();

// router
//   .route('/')
//   .get(getProductsByQuery, getProducts)
//   .post(validateProduct, addProduct);

router.route('/exportToCSV').get(getProductsCsv);

// router.route('/:id').put(validateProduct, modifyProduct).delete(deleteProduct);
// router.route('/:id').put(validateProduct, modifyProduct).delete(deleteProduct);

router.route('/').get(getProducts).post(addProduct);
router.route('/:id').put(modifyProduct).delete(deleteProduct).get(getProduct);

// router.route('/:id/upload').post(upload, uploadProductPic);
// router.route('/:id/upload').post(upload, uploadProductPic); 🚫

router.route('/:id/reviews').post(postReviewOnProductId).get(getProductReviews);
router.route('/:id/reviews/:revId').put(modifyReview);
router.route('/:id/reviews/:revId').delete(deleteReview);

router.route('/:id/pdf').get(getProductPDF);

export default router;
