import User from "../../models/User.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const CreateUser = async(req,res)=>{
    const {email , phone , password , userName,} = req.body
    let{Purchase,Usage,doTransactions} = req.body
    if(!email || !phone || !password || !userName) return responseReturn(res,false,400,"تأكد من أدخال جميع البيانات",null)
try{
    const valid = await createUserCValidationCheck(req,res,email , phone , password , userName)
    if(!valid) return;
    if(!(doTransactions === true)) doTransactions = false
    if(!(Purchase === true)) Purchase = false
    if(!(Usage === true)) Usage = false
    
    const user = await User.create({
        email:email,
        phone:phone,
        userName:userName,
        password:password,
        doTransactions:doTransactions,
        Purchase:Purchase,
        Usage:Usage,
    })
    return responseReturn(res,true,201,"تم انشاء المستخدم بنجاح",user)
}
catch(err){
   return errorCaught(res,err)
}
}

const createUserCValidationCheck = async(req,res,email , phone , password , userName)=>{
    try{
            const emailCheck = await User.findOne({email:email})
            if(emailCheck)  
                {
                    responseReturn(res,false,400,"هذا البريد الألكتروني موجود بالفعل",null)
                    return false
                }
            const userNamecheck = await User.findOne({userName:userName})
            if(userNamecheck)  
                {
                    responseReturn(res,false,400,"أسم المستخدم هذا موجود بالفعل",null)
                    return false;
                }
            if(password.length<6)  
                {
                    responseReturn(res,false,400,"برجاء استخدام كلمة سر مكونة من أكتر من 5 أرقام",null)
                    return false;
                }
            return true;}
    catch(err){
            console.log(err)
       return errorCaught(res,err)
    }
}

export default CreateUser