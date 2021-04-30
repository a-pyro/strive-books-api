import UserModel from '../models/Users.js';
import ErrorResponse from '../utils/errorResponse.js';
// GET /
export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
// Get /:id
export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return next(new ErrorResponse('resource not found'), 404);
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// POST /
export const addUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) return next(new ErrorResponse('user alredy registered'), 404);

    const newUser = { ...req.body };
    const savedUser = await UserModel.create(newUser);

    res.status(201).send({ success: true, data: savedUser });
  } catch (error) {
    next(error);
  }
};

// PUT /:id
export const editUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!user) return next(new ErrorResponse('resource not found'), 404);
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// DELETE /:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return next(new ErrorResponse('resource not found'), 404);
    res.status(200).send({ success: true, message: 'removed' });
  } catch (error) {
    next(error);
  }
};

// POST /:id/purchaseHistory/
export const addToPurchaseHistory = async (req, res, next) => {
  try {
    if (!user) return next(new ErrorResponse('resource not found'), 404);
    res.status(200).send({ success: true, data: 'addToPurchaseHistory' });
  } catch (error) {
    next(error);
  }
};

// GET /:id/purchaseHistory/
export const getPurchaseHistory = async (req, res, next) => {
  try {
    res.status(200).send({ success: true, data: 'getPurchaseHistory' });
  } catch (error) {
    next(error);
  }
};

// GET /:id/purchaseHistory/:productId
export const getProductFromPurchaseHistory = async (req, res, next) => {
  try {
    res
      .status(200)
      .send({ success: true, data: 'getProductFromPurchaseHistory' });
  } catch (error) {
    next(error);
  }
};

// DELETE /:id/purchaseHistory/:productId
export const deleteFromPurchseHistory = async (req, res, next) => {
  try {
    res.status(200).send({ success: true, data: 'deleteFromPurchseHistory' });
  } catch (error) {
    next(error);
  }
};

// PUT /:id/purchaseHistory/:productId
export const editBookInPurchaseHistory = async (req, res, next) => {
  try {
    res.status(200).send({ success: true, data: 'editBookInPurchaseHistory' });
  } catch (error) {
    next(error);
  }
};
