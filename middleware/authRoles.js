export const authRoles = (roles = []) =>{ //admin,user,superadmin
    return (req,res,next) =>{
        if(!req.user){
            return res.status(401).json({message: "usuario no logueado"})
        }

        if (!roles.includes(req.user.role)){
            return res.status(401).json({message: "usuario sin permiso para acceder a la ruta"})
        }

        next()
    }
}