import { Router } from "express";
import accountController from "../controller/accout.controller.js";
import verifyToken from "../middleware/verifytoken.js";

const accountRouter = Router()

accountRouter.post("/signup", accountController.signupMethod)
accountRouter.post("/signin", accountController.loginMethod)
accountRouter.get("/profile", verifyToken, accountController.getInforMethod)
accountRouter.post("/employee",verifyToken, accountController.createEmployee)
export default accountRouter