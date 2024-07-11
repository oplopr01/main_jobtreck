import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Job  from "../models/job";

export const deleteJob = async (req: Request, res: Response): Promise<Response> => {
  const jobId = req.params.jobId;

  try {
    const jobRepository = getRepository(Job);
    const job = await jobRepository.findOne(jobId);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    await jobRepository.remove(job);
    return res.status(200).json({ msg: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({ msg: 'An unexpected error occurred' });
  }
};
