// GET /
export const getUsers = async (req, res, next) => {
  try {
    res.status(200).send('getUsers');
  } catch (error) {
    next(error);
  }
};

// POST /
export const addUser = async (req, res, next) => {
  try {
    res.status(200).send('addUser');
  } catch (error) {
    next(error);
  }
};

// PUT /:id
export const editUser = async (req, res, next) => {
  try {
    res.status(200).send('editUser');
  } catch (error) {
    next(error);
  }
};

// DELETE /:id
export const deleteUser = async (req, res, next) => {
  try {
    res.status(200).send('deleteUser');
  } catch (error) {
    next(error);
  }
};

// POST /:id/purchaseHistory/
export const addToPurchaseHistory = async (req, res, next) => {
  try {
    res.status(200).send('addToPurchaseHistory');
  } catch (error) {
    next(error);
  }
};

// GET /:id/purchaseHistory/
export const getPurchaseHistory = async (req, res, next) => {
  try {
    res.status(200).send('getPurchaseHistory');
  } catch (error) {
    next(error);
  }
};

// GET /:id/purchaseHistory/:productId
export const getProductFromPurchaseHistory = async (req, res, next) => {
  try {
    res.status(200).send('getProductFromPurchaseHistory');
  } catch (error) {
    next(error);
  }
};

// DELETE /:id/purchaseHistory/:productId
export const deleteFromPurchseHistory = async (req, res, next) => {
  try {
    res.status(200).send('deleteFromPurchseHistory');
  } catch (error) {
    next(error);
  }
};

// PUT /:id/purchaseHistory/:productId
export const editBookInPurchaseHistory = async (req, res, next) => {
  try {
    res.status(200).send('editBookInPurchaseHistory');
  } catch (error) {
    next(error);
  }
};
