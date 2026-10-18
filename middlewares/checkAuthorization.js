import jsonwebtoken from "jsonwebtoken"
import "dotenv/config"
import User from "../models/User.Models.js"
import {responseReturn,errorCaught} from "../helpers/response.helpers.js"

const allowedRoutes = ["POST:/user/login",]
export const authMiddleWare = async(req,res,next)=>{
    try{
    const method = req.method
    const path = req.path
    const route = `${method}:${path}`
    if (allowedRoutes.some(allowedRoutes => route.includes(allowedRoutes))) {return next()}
    const Token = req.headers.authorization?.split(" ")[1]
    if(!Token) return responseReturn(res,false,405,"برجاء تسجيل الدخول اولاً",null)
    const decode = jsonwebtoken.verify(Token,process.env.SECRET)
    const user = await User.findById(decode.id)
    if(!user) return responseReturn(res,false,405,"Authorization Failed",null)
    if(!(user.role === decode.role)) return responseReturn(res,false,400,"Authorization Failed",null)
    req.auth = {
        userName:decode.userName,
        id: decode.id,
        role:decode.role,
        email:decode.email,
        Purchase: decode.Purchase,
        doTransactions: decode.doTransactions,
        Usage:decode.Usage
        }
        next()
    }
catch(err){
return errorCaught(res,err)}}