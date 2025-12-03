import { Router } from "express";
import accountRouter from "./account.js";
import employeeRouter from "./employee.js";
import jobsRouter from "./jobs.js";
import adminRouter from "./admin.js"; // <-- Thêm dòng này
import scheduleRouter from "./schedule.js"; // <--- MỚI THÊM
import salaryRouter from "./salary.js";
import timesheetRouter from "./timesheet.js";
import notificationRouter from "./notification.js";

const Root = Router()
Root.use("/account", accountRouter)
Root.use("/employees", employeeRouter)
Root.use("/jobs", jobsRouter)
Root.use("/admin", adminRouter); // <-- Thêm dòng này
Root.use("/schedules", scheduleRouter); // <--- MỚI THÊM
Root.use("/salary", salaryRouter);
Root.use("/timesheet", timesheetRouter);
Root.use("/notifications", notificationRouter);
export default Root