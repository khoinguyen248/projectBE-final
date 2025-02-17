import mongoose, { Schema } from "mongoose";


const jobsSchema = new Schema({
  name: {type: String, required: true},
  spec: {type: String, required: true},
  time: {type: String, required: true},
 place: {type: String, required: true},
  location: {type: String, required: true},
  pricetag: {type: String },
  id: {type: Number}
})


const jobslistSchema = new Schema({
    type: {type: String, required: true},
    jobs: [jobsSchema],
    khoi: {type: String, required: true},
    id: {type: String}
})

const jobslistModel = mongoose.model("jobs", jobslistSchema)
export default jobslistModel