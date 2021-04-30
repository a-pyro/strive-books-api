import { Router } from "express";
import mongoose from "mongoose";
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
} from "../controllers/products.js";

const router = Router();

router.route("/exportToCSV").get(getProductsCsv);

router.route("/").get(getProductsByQuery, getProducts).post(addProduct);
router.route("/:id").put(modifyProduct).delete(deleteProduct).get(getProduct);

router.route("/:id/reviews").post(postReviewOnProductId).get(getProductReviews);
router.route("/:id/reviews/:revId").put(modifyReview);
router.route("/:id/reviews/:revId").delete(deleteReview);

router.route("/:id/pdf").get(getProductPDF);

export default router;
