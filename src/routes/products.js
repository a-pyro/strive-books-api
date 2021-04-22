import { Router } from 'express';
import {
  getProducts,
  addProduct,
  modifyProduct,
  deleteProduct,
  uploadProductPic,
  getProductReviews,
  getProductsByQuery,
  getProductsCsv,
} from '../controllers/products.js';
import {
  validateProduct,
  validateProductSchema,
} from '../middlewares/validation/productsValidation.js';
// import multerValidation from '../middlewares/validation/multerValidation.js';
import multerUploadCloudinary from '../middlewares/products/pictureUpload.js';
const upload = multerUploadCloudinary();
const router = Router();

router
  .route('/')
  .get(getProductsByQuery, getProducts)
  .post(validateProduct, addProduct);

router.route('/exportToCSV').get(getProductsCsv);

// router.route('/:id').put(validateProduct, modifyProduct).delete(deleteProduct);
router.route('/:id').put(validateProduct, modifyProduct).delete(deleteProduct);

// router.route('/:id/upload').post(upload, uploadProductPic);
router.route('/:id/upload').post(upload, uploadProductPic);

router.route('/:id/reviews').get(getProductReviews);

export default router;
