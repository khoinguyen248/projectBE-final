import { Router } from "express";
import accountRouter from "./account.js";
import employeeRouter from "./employee.js";
import jobsRouter from "./jobs.js";
import adminRouter from "./admin.js"; // <-- Thêm dòng này

const Root = Router()
Root.use("/account", accountRouter)
Root.use("/employees", employeeRouter)
Root.use("/jobs", jobsRouter)
Root.use("/admin", adminRouter); // <-- Thêm dòng này
export default Root