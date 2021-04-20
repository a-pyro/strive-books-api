import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errorResponse.js';
import {
  fetchProducts,
  fetchReviews,
  writeProducts,
  writeProductsPics,
} from '../utils/fsUtils.js';
import { extname } from 'path';

// @desc    Get all products
// @route   GET /products
export const getProducts = async (req, res, next) => {
  try {
    const products = await fetchProducts();

    res.status(200).send({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products by query
// @route   GET /products?
export const getProductsByQuery = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length > 0) {
      const products = await fetchProducts();
      let output = {};

      // console.log(req.query);
      // const output = products.filter((prod) => prod[req]);
      for (const key in req.query) {
        const query = key.toLowerCase();
        const value = req.query[query].toLowerCase();
        // console.log(query, ':', value);
        // console.log(products);
        // const found = products.filter((prod) => prod[query] === value);
        // console.log(found);
        // output[value] = [...found];
        // console.log(query, value);
        const found = products.filter((prod) => prod[query] === value);
        output.push();
      }

      res.status(200).send({ success: true, data: output });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc    add product
// @route   POST /products

export const addProduct = async (req, res, next) => {
  try {
    const products = await fetchProducts();
    const newProduct = {
      ...req.body,
      _id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(products);
    // const productAlreadyPresent = products.some(prod => {
    //   if(prod.name.LowerCase() === newProduct.name.toLowerCase() || )
    // })
    products.push(newProduct);
    await writeProducts(products);
    res.status(201).send({ success: true, _id: newProduct._id });
  } catch (error) {
    return next(error);
  }
};

// @desc    modify  product
// @route   PUT /products/:id

export const modifyProduct = async (req, res, next) => {
  try {
    const products = await fetchProducts();
    let modifiedProduct;

    if (products.some((prod) => prod._id === req.params.id)) {
      const newProducts = products.reduce((acc, cv) => {
        if (cv._id === req.params.id) {
          modifiedProduct = { ...cv, ...req.body, updatedAt: new Date() };
          acc.push(modifiedProduct);
          return acc;
        }
        acc.push(cv);
        return acc;
      }, []);

      await writeProducts(newProducts);
      res.status(200).send({ success: true, data: modifiedProduct });
    } else {
      next(new ErrorResponse('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    delete product
// @route   DELETE /products/:id

export const deleteProduct = async (req, res, next) => {
  try {
    const products = await fetchProducts();
    if (products.some((prod) => prod._id === req.params.id)) {
      const newProducts = products.filter((prod) => prod._id !== req.params.id);
      res.status(200).send({ success: true, message: 'product removed' });
      await writeProducts(newProducts);
    } else {
      next(new ErrorResponse('Product not found', 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    add image to product
// @route   POST /products/:id/upload
export const uploadProductPic = async (req, res, next) => {
  try {
    const products = await fetchProducts();
    if (products.some((prod) => prod._id === req.params.id)) {
      console.log(req.file);
      const { buffer, originalname } = req.file;
      const filename = req.params.id + extname(originalname);
      const imgUrl = `${req.protocol}://${req.get(
        'host'
      )}/img/products/${filename}`;
      //scrivo nel file url
      const newProducts = products.reduce((acc, cv) => {
        if (cv._id === req.params.id) {
          cv.imgUrl = imgUrl;
          cv.updatedAt = new Date();
          acc.push(cv);
          return acc;
        }
        acc.push(cv);
        return acc;
      }, []);
      await writeProducts(newProducts);
      await writeProductsPics(filename, buffer);
      res.status(200).send({ success: true, imgUrl: `${imgUrl}` });
    } else {
      next(new ErrorResponse('Product not found', 404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc    get reviews for a product
// @route   GET /products/:id/reviews
export const getProductReviews = async (req, res, next) => {
  try {
    const products = await fetchProducts();
    if (products.some((prod) => prod._id === req.params.id)) {
      const reviews = await fetchReviews();
      const productReviews = reviews.filter(
        (rev) => rev.productId === req.params.id
      );
      if (productReviews.length === 0) {
        return res.status(200).send({
          success: true,
          message: 'no reviews available for that product',
        });
      }
      res.status(200).send({ success: true, data: productReviews });
    } else {
      next(new ErrorResponse('Product not found', 404));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
