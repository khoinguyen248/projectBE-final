import mongoose, {Schema} from "mongoose";
const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: "String",
        required: true

    },
    address: {
        type: "String",
        required: true
    },
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true }
})

export default customerModel = mongoose.model("Customers", customerSchema)