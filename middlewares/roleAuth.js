const roleAuth = (allowedRoles)=>{
    return(req,res,next) =>{
    try{
        if(!req.auth){
            return res.status(401).json({
                success:false,
                message:"authorization required",})
        }
    if (allowedRoles.includes(req.auth.role)) return next()
    return res.status(401).json({success:false,message:"authorization failed",})      
    }
    catch(e){

    }
}}


export const admin = roleAuth(["admin","superAdmin"])
export const superAdmin = roleAuth(["superAdmin"])