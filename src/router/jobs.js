import { Router } from "express";
import jobsController from "../controller/jobs.controller.js";


const jobsRouter = Router()

jobsRouter.get("/alljobs", jobsController.getjobs)
jobsRouter.post("/updateJobs", jobsController.updatejobs)

export default jobsRouter