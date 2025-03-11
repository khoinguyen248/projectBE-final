import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema({
  id: { type: String, required: true },
  date: { type: String, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  break: { type: String, required: true },
  workingHours: { type: String, required: true },
  status: { type: String, required: true },
});

const ProjectSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: String, required: true },
  fdate: { type: String, required: true },
});

const EmployeeSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  name: { type: String, required: true },

  img: { type: String },
  department: { type: String, required: true },
  emnums: { type: Number, required: true },
  designation: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  email: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  address: { type: String, required: true },
  marriedstatus: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  DOB: { type: String, required: true },
  attendance: [AttendanceSchema],
  projects: [ProjectSchema],
});

 const  Employee = mongoose.model("employee", EmployeeSchema);
export default Employee