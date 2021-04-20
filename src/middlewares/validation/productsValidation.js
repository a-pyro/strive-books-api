import { check, checkSchema, validationResult } from 'express-validator';
import ErrorResponse from '../../utils/errorResponse.js';
import multer from 'multer';
import { extname } from 'path';

export const validateProduct = [
  check('name').trim().notEmpty().withMessage('name cannot be empty'),
  check('description')
    .trim()
    .notEmpty()
    .withMessage('description cannot be empty'),
  check('brand').trim().notEmpty().withMessage('brand cannot be empty'),
  check('price').notEmpty().withMessage('price cannot be empty'),
  check('category').trim().notEmpty().withMessage('category cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ErrorResponse(
        `Something went wrong with validation`,
        400,
        'productValidation'
      );
      error.errList = errors.errors;
      return next(error);
    }
    next();
  },
];

// const productSchema = {
//   name: 'iPhone 13',
//   description: 'straight from the future',
//   brand: 'apple',
//   price: 1000,
//   category: 'smartphones',
// };

// export const validateProductSchema = (req, res, next) => {
//   checkSchema()
// }

export const validateProductSchema = (req, res, next) => {
  const productValidationSchema = {
    name: {
      notEmpty: true,
      errorMessage: 'name cannot be empty',
    },
    description: {
      notEmpty: true,
      errorMessage: 'description cannot be empty',
    },
    brand: {
      notEmpty: true,
      errorMessage: 'brand cannot be empty',
    },
    price: {
      notEmpty: true,
      errorMessage: 'price cannot be empty',
    },
    category: {
      notEmpty: true,
      errorMessage: 'category cannot be empty',
    },
  };
  checkSchema(productValidationSchema);
  next();
};
