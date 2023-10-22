import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { createJobController, deleteJobController, getAllJobController, jobStatisticFilter, updateJobController } from "../controllers/jobsController.js";


const router = express.Router()
//create routr
router.post('/createJob', userAuth, createJobController);

//GetsJobs
router.get('/getJob', userAuth, getAllJobController);

//updateJobs
router.patch('/updateJob/:id', userAuth, updateJobController)

//DeleteJobs

router.delete('/deleteJob/:id', userAuth, deleteJobController)

//JobsStatsFilter
router.get('/jobStats', userAuth, jobStatisticFilter)
export default router
