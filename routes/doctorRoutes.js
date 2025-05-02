import express from 'express';
import { addDoctor, listDoctors } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/add-doctor', addDoctor);
router.get('/list-doctors', listDoctors);

export default router;
