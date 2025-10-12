import { Router } from "express";

import employeeController from "../controller/employee.controller.js";

const employeeRouter = Router()


employeeRouter.get("/allemployees", employeeController.sendEmployee)
employeeRouter.post("/addemployee", employeeController.addEmployee)
employeeRouter.delete("/deleteUser", employeeController.deleteEmployee)
export default employeeRouter