import { Router } from "express";
import accountRouter from "./account.js";

const Root = Router()
Root.use("/account", accountRouter)
export default Root