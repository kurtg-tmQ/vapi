import express from 'express';
import * as callController from '../controllers/callController.js';

const router = express.Router();

router.get('/stream', callController.getExample);

export default router;