import { check, validationResult, checkSchema } from "express-validator";
import ErrorResponse from "../../utils/errorResponse.js";

export const validateReview = [
  check("comment").trim().notEmpty().withMessage("comment cannot be empty"),
  check("rate")
    .trim()
    .notEmpty()
    .isFloat({ min: 1, max: 5 })
    .withMessage("rating must be a number between 1 and 5"),
  //   check('productId').trim().notEmpty().withMessage('productId cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ErrorResponse(
        `Something went wrong with validation`,
        400,
        "reviewValidation"
      );
      error.errList = errors;
      return next(error);
    }
    next();
  },
];

// doesnt work, needs more testing
const validateSchemaReview = {
  comment: {
    notEmpty: true,
    errorMessage: "comment cannot be empty",
  },
  rate: {
    notEmpty: true,
    isFloat: { min: 1, max: 5 },
    errorMessage: "rating must be a number between 1 and 5",
  },
  productId: {
    notEmpty: true,
    errorMessage: "productId cannot be empty",
  },
};

export const schemaReview = checkSchema(validateSchemaReview);
