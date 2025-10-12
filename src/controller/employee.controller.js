import accountModel from "../models/account.js";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import Employee from "../models/employee.js";



const employeeController = {


  sendEmployee: async (req, res) => {
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
  addEmployee: async (req, res) => {
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
  },

  deleteEmployee: async (req, res) => {
    // try {
    //   const { email, role, employeename, emailEmployee } = req.body
    //   const adminUser = accountModel.findOne({ email: email, role: role })
    //   if (!adminUser) {
    //     res.status(403).send({ Message: "No user !" });
    //   } else {
    //     if (adminUser.role == "MANAGER") {
    //       await Employee.deleteOne({ name: employeename, email: emailEmployee });
    //       res.status(201).send({ Message: "Employee deleted successfully !" });
    //     }
    //     else {
    //       res.status(403).send({ Message: "Access denied !" });
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error deleting employees:", error);
    //   res.status(500).json({ message: "Internal Server Error" });
    // 



    try {
      const { email, role, name, employeeEmail } = req.body
      console.log("BODY:", req.body);
      const adminUser = await accountModel.findOne({ email: email, role: role })
      console.log(adminUser)
      if (adminUser == undefined) {
        res.status(403).send({ Message: "No user !" });
      } else {
        if (adminUser.role == "MANAGER") {
          await Employee.deleteOne({ name: name, email: employeeEmail })
          res.status(201).send({ Message: "Employee deleted successfully !" });
        }
        else {
          res.status(403).send({ Message: "Access denied !" });
        }
      }
    } catch (error) {
      console.error("Error deleting employees:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }





  },




}

export default employeeController