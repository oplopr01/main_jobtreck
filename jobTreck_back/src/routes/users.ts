import bcryptjs from "bcryptjs";


import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { checkToken } from "../config/safeRoutes";
import ActiveSession from "../models/activeSession";
import User from "../models/user";

import { connection } from "../server/database";
import { logoutUser } from "../controllers/logout.controller";
import { getRepository } from "typeorm";
import Job from "../models/job";
import { deleteJob } from  '../controllers/jobController';

import userDetails from '../dummyDelete/userDetails.json'
const router = express.Router();
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(4).max(15).optional(),
  password: Joi.string().required(),
  user_role: Joi.string(),
});

const jobSchema = Joi.object({
  jobId: Joi.string().required(),
  userId: Joi.string().required(),
  jobTitle: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  salary: Joi.number().required(),
  dateOfPost: Joi.date().required(),
  lastDate: Joi.date().required(),
  experience: Joi.string().required(),
  category: Joi.string().required(),
  skills: Joi.string().required(),
});

router.post("/register", (req, res) => {
  const result = userSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation error: ${result.error.details[0].message}`,
    });
  }

  const { username, email, password, user_role } = req.body;
  const userRepository = connection!.getRepository(User);

  userRepository.findOne({ email }).then((user) => {
    if (user) {
      return res.json({ success: false, msg: "Email already exists" });
    } else {
      bcryptjs.genSalt(10, (_err, salt) => {
        bcryptjs.hash(password, salt).then((hash) => {
          const query = {
            username,
            email,
            password: hash,
            user_role,
          };

          userRepository.save(query).then((u) => {
            return res.json({
              success: true,
              userID: u.userId,
              msg: "The user was successfully registered",
            });
          });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const result = userSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({
      success: false,
      msg: `Validation error: ${result.error.details[0].message}`,
    });
  }

  const { email, password } = req.body;
  const userRepository = connection!.getRepository(User);
  const activeSessionRepository = connection!.getRepository(ActiveSession);

  userRepository.findOne({ email }).then((user) => {
    if (!user) {
      return res.json({ success: false, msg: "Wrong credentials" });
    }

    bcryptjs.compare(password, user.password, (_err2, isMatch) => {
      if (isMatch) {
        if (!process.env.SECRET) {
          return res.status(500).json({ success: false, msg: "SECRET not provided" });
        }

        const token = jwt.sign(
          {
            id: user.userId,
            username: user.username,
            email: user.email,
          },
          process.env.SECRET,
          {
            expiresIn: 86400, // 1 week
          }
        );

        const query = { userId: user.userId, token };
        activeSessionRepository.save(query);

        (user as { password: string | undefined }).password = undefined;
        return res.json({
          success: true,
          token,
          user,
        });
      }
      return res.json({ success: false, msg: "Wrong credentials" });
    });
  });
});

router.post("/logout", checkToken, logoutUser);

router.post("/checkSession", checkToken, (_req, res) => {
  res.json({ success: true });
});

router.get("/joblistings", async (_req, res) => {
  try {
    const jobListings = await getRepository(Job).find();
    res.json(jobListings);
  } catch (err) {
    console.error("Error fetching job listings:", err);
    res.status(500).json({ error: "Error fetching job listings" });
  }
});
 
router.post('/createjobs', async (req, res) => {
  // Validate request body
  const result = jobSchema.validate(req.body);
  if (result.error) {
    return res.status(422).json({ success: false, msg: `Validation error: ${result.error.details[0].message}` });
  }
 
  const { jobId, userId, jobTitle, description, location, salary, dateOfPost, lastDate, experience, category, skills } = req.body;
 
  try {
    // Get Job repository
    const jobRepository = getRepository(Job);
 
    // Check if job already exists
    const existingJob = await jobRepository.findOne({ where: { jobId } });
    if (existingJob) {
      return res.status(400).json({ success: false, msg: 'Job ID already exists' });
    }
 
    // Create new job instance
    const newJob = jobRepository.create({
      jobId,
      userId,
      jobTitle,
      description,
      location,
      salary,
      dateOfPost,
      lastDate,
      experience,
      category,
      skills,
    });
 
    // Save job to database
    await jobRepository.save(newJob);
    res.status(201).json({ success: true, msg: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

router.get("/joblistings/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await getRepository(Job).findOne(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    console.error("Error fetching job details:", err);
    res.status(500).json({ error: "Error fetching job details" });
  }
});

router.put('/editjob/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const result = jobSchema.validate(req.body);

  if (result.error) {
    return res.status(422).json({ success: false, msg: `Validation error: ${result.error.details[0].message}` });
  }

  const { userId, jobTitle, description, location, salary, dateOfPost, lastDate, experience, category , skills} = req.body;

  try {
    const jobRepository = getRepository(Job);
    const job = await jobRepository.findOne({ where: { jobId } });

    if (!job) {
      return res.status(404).json({ success: false, msg: 'Job not found' });
    }
    
    job.userId = userId;
    job.jobTitle = jobTitle;
    job.description = description;
    job.location = location;
    job.salary = salary;
    job.dateOfPost = dateOfPost;
    job.lastDate = lastDate;
    job.experience = experience;
    job.category = category;
    job.skills = skills;

    await jobRepository.save(job);
    res.status(200).json({ success: true, msg: 'Job updated successfully', job });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
});

router.delete('/deletejob/:jobId', deleteJob);


router.get('/userdetails', (req, res) => {
  // Fetch user details by userId
  req.params
  res.json(userDetails)
});

// router.put('/acceptapplication/:userId', (req, res) => {
//   // Accept the application for the given userId
// });

// router.put('/rejectapplication/:userId', (req, res) => {
//   // Reject the application for the given userId
// });
router.post("/all", checkToken, (_req, res) => {
  const userRepository = connection!.getRepository(User);

  userRepository
    .find({})
    .then((users) => {
      users = users.map((item) => {
        const x = item;
        (x as { password: string | undefined }).password = undefined;
        return x;
      });
      res.json({ success: true, users });
    })
    .catch(() => res.json({ success: false }));
});

router.post("/edit", checkToken, (req, res) => {
  const { userID, username, email } = req.body;
  const userRepository = connection!.getRepository(User);

  userRepository.find({ userId: userID }).then((user) => {
    if (user.length === 1) {
      const query = { userId: user[0].userId };
      const newvalues = { username, email };

      userRepository
        .update(query, newvalues)
        .then(() => {
          res.json({ success: true });
        })
        .catch(() => {
          res.json({
            success: false,
            msg: "There was an error. Please contact the administrator",
          });
        });
    } else {
      res.json({ success: false, msg: "Error updating user" });
    }
  });
});

router.get("/testme", (_req, res) => {
  res.status(200).json({ success: true, msg: "all good" });
});

export default router;
