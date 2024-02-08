import express from 'express';
import { UserController } from '../controllers/userController';
import { db } from '../datastore/datastore';
const userController = new UserController(db);

const router = express.Router();

router.post('/signup', userController.signUp);

export default router;
