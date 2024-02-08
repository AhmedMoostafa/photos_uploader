import express from 'express';
import { db } from '../datastore/datastore';
import { PhotoController } from '../controllers/photoController';
const router = express.Router();
const photoController = new PhotoController(db);
router.get('/list', photoController.allPhotos);

export default router;
