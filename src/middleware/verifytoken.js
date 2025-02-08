import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized")
    }
    const token = req.headers.authorization.split("Bearer ")[1]

   const payload = jwt.verify(token, "khoinguyen")

   if(!payload){
    return res.status(401).send("Unauthorized")
   }

   next()
}

export default verifyToken