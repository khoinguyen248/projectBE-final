import accountModel from "../models/account.js";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import Employee from "../models/employee.js";



const employeeController = {
    

      sendEmployee: async(req, res) => {
        try {
            const Employees = await Employee.find();
            res.status(200).json({
              message: "List of employees",
              employees: Employees,
            });
          } catch (error) {
            console.error("Error fetching employees:", error);
            res.status(500).json({ message: "Internal Server Error" });
          }
      },
      addEmployee: async(req,res)=> {
        try {
          const { firstname, lastname, name, img, department, emnums, designation, type, status, email, mobilenumber, address, marriedstatus, gender, city, state, zipcode, DOB, attendance, projects } = req.body;

        const newEmployee = {
          firstname, lastname, name, img, department, emnums, designation, type, status, email, mobilenumber, address, marriedstatus, gender, city, state, zipcode, DOB, attendance, projects
        }

        const add = new Employee(newEmployee)
        await add.save()
        console.log(add)
        res.status(201).send({ Message: "User created successfully", add });
        }

       catch (error) {
          
        }
      }
}

export default employeeController