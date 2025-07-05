// controllers/careerController.js
import Application from '../model/Application.js';
import Job from '../model/jobModel.js';

export const submitApplication = async (req, res) => {
  try {
      const {
      name,
      email,
      phone,
      experience,
      message,
      resumeUrl,
      jobId,
      position,
    } = req.body;

    if (!name || !email || !phone || !experience || !resumeUrl || !jobId || !position) {
      return res.status(400).json({ success: false, message: "All required fields must be filled." });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const application = new Application({
      name,
      email,
      phone,
      experience,
      message,
      resumeUrl,
      jobId,
      position,
    });

    await application.save();

    res.status(201).json({ success: true, message: "Application submitted successfully." });
  } catch (err) {
    console.error("Error submitting application:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// controllers/careerController.js
export const getApplicationsByJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const applications = await Application.find({ jobId: jobId }).sort({ createdAt: -1 });
    res.status(200).json({jobTitle: job.title, applications});
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Application deleted" });
  } catch (err) {
    console.error("Error deleting application:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
