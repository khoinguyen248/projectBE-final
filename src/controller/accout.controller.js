import accountModel from "../models/account.js";
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const accountController =  {
      signupMethod : async(req, res) => {
        const { email, password, role} = req.body

        if(!email || !password){
          return res.status(401).send({
            message: "Missing Required information !"
        })
        }
        const accountchecked = await accountModel.findOne({email})
        if(accountchecked){
          return res.status(401).send({
              message: "Email already existed !"
          })
      }
        const mixedPass = await bcrypt.hash(password, 10)
        const newaccount = new  accountModel({
        
            email: email,
            password: mixedPass,
            role: role || "CUSTOMER"
            
        })
        

       await newaccount.save()
      

        console.log(mixedPass)

        res.status(201).send({
            message: "Account created !",
            data: newaccount
        })


      },
      loginMethod: async(req, res) => {
        const {email, password} = req.body
        
        console.log(email, password)
        const accountchecked = await accountModel.findOne({email})

        if(!accountchecked){
          return res.status(401).send({
              message: "Missing information, "
          })
      }
        console.log(accountchecked)

        const checkSync = await bcrypt.compare(password, accountchecked.password)

        if(!checkSync){
            return res.status(401).send({
                message: "Wrong information, "
            })
        }

        else{
            const token = jwt.sign({email: accountchecked.email, role: accountchecked.role}, "khoinguyen", {expiresIn: "2h"})
            res.status(200).json({
                message: "Đăng nhập thành công",
                token: token,
                account: {
                  email: accountchecked.email,
                  role: accountchecked.role,
                },
              });
        }
      },

      getInforMethod: async( req, res) => {
        const {email} = req.query

        const userChecked = await accountModel.findOne({email})

        if(!userChecked){
          return  res.status(404).send("No users found!")
        }

        const UserFound = {
            email: userChecked.email,
            role: userChecked.role
        }
        
        res.status(200).send({
            message: "User found sucessfully",
            data: UserFound
        })

      },

      createEmployee: async(req, res) => {
        const {email} = req.query

        const accountcheck  = await accountModel.findOne({email})
        
        if(!accountcheck){

            return res.status(404).send("No Users Found")
        }

        if(accountcheck.role != "MANAGER"){
            return res.status(401).send("Unauthorized")
        }

        const {email: bodyemail, password, isActive, role } = req.body
        
        const UsedEmails = await accountModel.findOne({email: bodyemail})

        if(UsedEmails){
            return res.status(404).send("Email is already used !")
        }
        else{
            const passHashed = await  bcrypt.hash(password, 10)

            const newaccount = new accountModel({
                email: bodyemail,
                password: passHashed,
                isAcitive: isActive || true,
                role: role || "CUSTOMER"

        })

        await newaccount.save()
        res.status(201).send({
            message: "Account created !",
            data: newaccount
        })
        }

      }
}

export default accountController