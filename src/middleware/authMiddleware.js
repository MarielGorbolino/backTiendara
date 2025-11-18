import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next) =>{
    const accesstoken = req.headers["authorization"]
    if(!accesstoken){
        return res.status(401).json({message: "sin token"})
    }
    jwt.verify(accesstoken,process.env.JWT_ACCESS,(err,user)=>{
        if(err){
            console.log(err)
            return res.status(403).json({message:"token no valido o expirado"})
        }
        req.user= user;
        next();
    })
}