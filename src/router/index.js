import { Router } from "express";
import accountRouter from "./account.js";
import employeeRouter from "./employee.js";
import jobsRouter from "./jobs.js";
import adminRouter from "./admin.js"; 
import scheduleRouter from "./schedule.js"; 
import salaryRouter from "./salary.js";
import timesheetRouter from "./timesheet.js";
import notificationRouter from "./notification.js";
import predictRouter from "./predict.js";

const Root = Router()
Root.use("/account", accountRouter)
Root.use("/employees", employeeRouter)
Root.use("/jobs", jobsRouter)
Root.use("/admin", adminRouter); // <-- Thêm dòng này
Root.use("/schedules", scheduleRouter); // <--- MỚI THÊM
Root.use("/salary", salaryRouter);
Root.use("/timesheet", timesheetRouter);
Root.use("/notifications", notificationRouter);
Root.use("/me", employeeRouter);
Root.use("/predict", predictRouter);

export default Root