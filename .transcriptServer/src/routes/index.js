import express from 'express';
import call from './call.js';

const router = express.Router();

router.use('/stream', call);

export default router;