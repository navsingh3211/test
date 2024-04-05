import express from 'express';
import {getProductDetails} from './db.js';
const router = express.Router();

router.get('/getProduct',getProductDetails);

export default router;
