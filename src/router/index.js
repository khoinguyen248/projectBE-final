import { Router } from "express";
import accountRouter from "./account.js";
import employeeRouter from "./employee.js";
import jobsRouter from "./jobs.js";

const Root = Router()
Root.use("/account", accountRouter)
Root.use("/employees", employeeRouter)
Root.use("/jobs", jobsRouter)
export default Root