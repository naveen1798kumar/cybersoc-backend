import express from 'express';
import { submitApplication, getApplicationsByJob, deleteApplication } from '../controllers/careerController.js';

const router = express.Router();

router.post('/apply', submitApplication);
router.get('/:jobId/applications', getApplicationsByJob); // 👈 Add this

// DELETE /api/career/application/:id
router.delete('/application/:id', deleteApplication);

export default router;
