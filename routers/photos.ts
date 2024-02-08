import express from 'express';
import { db } from '../datastore/datastore';
import { PhotoController } from '../controllers/photoController';
import asyncHandler from 'express-async-handler';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
const photoController = new PhotoController(db);
router.get('/list', asyncHandler(authMiddleware), asyncHandler(photoController.allPhotos));
router.put('/list/:id', asyncHandler(authMiddleware), asyncHandler(photoController.allPhotos));

export default router;
