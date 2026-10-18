import User from "../../models/User.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import {genToken} from "../../helpers/jwt.helpers.js"

export const LoginFunc = async(req,res)=>{
    const {userName,password} = req.body
    if(!userName||!password) 
        return responseReturn(res,false,400,"برجاء إدخال جميع البيانات",null)
    const user = await User.findOne({userName})
    if(!user) return responseReturn(res,false,400,"خطأ في اسم المستخدم او كلمة السر",null)
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) return responseReturn(res,false,400,"خطأ في اسم المستخدم او كلمة السر",null)
    const Token = genToken(user)
    return responseReturn(res,true,200,"تم تسجيل الدخول بنجاح",Token)
}