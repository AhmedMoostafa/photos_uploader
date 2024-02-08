import express from 'express';
import { db } from '../datastore/datastore';
import { PhotoController } from '../controllers/photoController';
import asyncHandler from 'express-async-handler';
import { authMiddleware } from '../middlewares/authMiddleware';
import { multerImageMiddleware } from '../middlewares/multerImageMiddleware';

const router = express.Router();
const photoController = new PhotoController(db);
router.get('/list', asyncHandler(photoController.allPhotos));
router.patch('/update/:id', asyncHandler(photoController.updatePhoto));
router.post(
  '/upload',
  asyncHandler(multerImageMiddleware),
  asyncHandler(photoController.uploadPhoto)
);

export default router;
