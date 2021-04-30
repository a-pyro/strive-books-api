import { Router } from 'express';
import {
  addToPurchaseHistory,
  addUser,
  deleteFromPurchseHistory,
  deleteUser,
  editBookInPurchaseHistory,
  editUser,
  getProductFromPurchaseHistory,
  getPurchaseHistory,
  getUser,
  getUsers,
} from '../controllers/users.js';

const router = Router();

router.route('/').get(getUsers).post(addUser);
router.route('/:id').put(editUser).delete(deleteUser).get(getUser);

router
  .route('/:id/purchaseHistory')
  .post(addToPurchaseHistory)
  .get(getPurchaseHistory);

router
  .route('/:id/purchaseHistory/:productId')
  .get(getProductFromPurchaseHistory)
  .delete(deleteFromPurchseHistory)
  .put(editBookInPurchaseHistory);

export default router;
