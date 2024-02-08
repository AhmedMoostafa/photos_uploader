import express from 'express';
import { UserController } from '../controllers/userController';
import { db } from '../datastore/datastore';
import asyncHandler from 'express-async-handler';

const userController = new UserController(db);

const router = express.Router();

router.post('/signup', asyncHandler(userController.signUp));
router.post('/login', asyncHandler(userController.signIn));

export default router;
