import express from 'express';
import Job from '../model/jobModel.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job", error: err });
  }
});

// Create new job
router.post('/', async (req, res) => {
  const {
    title,
    minQualification,
    openings,
    experience,
    location,
    timing,
    shift,
    salary,
    type,
    skills,
    description,
  } = req.body;

  try {
    const job = new Job({
      title,
      minQualification,
      openings,
      experience,
      location,
      timing,
      shift,
      salary,
      type,
      skills,
      description,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("❌ Job creation error:", err.message);
    res.status(400).json({ message: "Invalid job data", error: err });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job" });
  }
});

// Update a job
router.put('/:id', async (req, res) => {
  const {
    title,
    minQualification,
    openings,
    experience,
    location,
    timing,
    shift,
    salary,
    type,
    skills,
    description,
  } = req.body;
  try {
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        minQualification,
        openings,
        experience,
        location,
        timing,
        shift,
        salary,
        type,
        skills,
        description,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
});

export default router;
