import mongoose, {Schema} from "mongoose";

const accoutSchema = new mongoose.Schema({
     email:{
        type: String,
        unique: true,
        required: true
     },

     password:{
        type: String,
        required: true

     },
     isAcitive: {
        type: Boolean,
        enums: [true, false],
        default: true
     },
     role:{
        type: String,
        enums: ["MANAGER",  "EMPLOYEE"],
        default: "EMPLOYEE"
     }
})

const accountModel = mongoose.model("Account", accoutSchema)
export default accountModel