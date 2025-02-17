import accountModel from "../models/account.js";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import employee from "../models/employee.js";



const employeeController = {
    

      sendEmployee: async(req, res) => {
        try {
            const Employees = await employee.find();
            res.status(200).json({
              message: "List of employees",
              employees: Employees,
            });
          } catch (error) {
            console.error("Error fetching employees:", error);
            res.status(500).json({ message: "Internal Server Error" });
          }
      }
}

export default employeeController