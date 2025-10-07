import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next) =>{
    //sacar el token del header
    const accesstoken = req.headers["authorization"]
    //console.log(accesstoken)
    //console.log(process.env.JWT_ACCESS)
    //validar el token
    if(!accesstoken){
        return res.status(401).json({message: "sin token"})
    }

    jwt.verify(accesstoken,process.env.JWT_ACCESS,(err,user)=>{
        if(err){
            console.log(err)
            return res.status(401).json({message:"token no valido o expirado"})
        }
        req.user= user;
        next();
    })
    //si el token esta bien next sino error
}