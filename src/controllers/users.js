import UserModel from '../models/Users.js';
// GET /
export const getUsers = async (req, res, next) => {
  try {
    res.status(200).send({ success: true, data: 'getUsers' });
  } catch (error) {
    next(error);
  }
};

// POST /
export const addUser = async (req, res, next) => {
  try {
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
    res.status(200).send({ success: true, data: 'editUser' });
  } catch (error) {
    next(error);
  }
};

// DELETE /:id
export const deleteUser = async (req, res, next) => {
  try {
    res.status(200).send({ success: true, data: 'deleteUser' });
  } catch (error) {
    next(error);
  }
};

// POST /:id/purchaseHistory/
export const addToPurchaseHistory = async (req, res, next) => {
  try {
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
