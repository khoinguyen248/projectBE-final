import jobslistModel from "../models/jobs.js"

const jobsController = {
    getjobs: async(req, res) => {
        try {
            const jobslist = await jobslistModel.find({})

            res.status(200).send({
                message: "jobs",
                data: jobslist
            })
        } catch (error) {
            console.log("Fetching fault: ", error)
        }
    },

    updatejobs: async(req,res) => {
       try {
        const newdata = req.body

        console.log(newdata)
        await jobslistModel.deleteMany({})
        await jobslistModel.insertMany(newdata)
        

        

        res.status(201).send({
            data: newlist
        })
       } catch (error) {
        console.log("Fetching fault: ", error)
       }
    }
}


export default jobsController