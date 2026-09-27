import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const createProduct = async(req,res)=>{
try{
    const {active , name , code , description,measurementUnit} = req.body
    if(!name || !code) return responseReturn(res,false,400,"تأكد من أدخال جميع البيانات",null)
    const productValid = await createProductValidations(res,name,code)
    if(!productValid) return;
    const Product = await Products.create({
        name:name,
        code:code,
        description:description,
        measurementUnit:measurementUnit,
        active:active
    })
    if(!Product) return responseReturn(res,false,400,"فشل في انشاء منتج جديد",null)
    return responseReturn(res,true,201,`تم انشاء المنتج ${Product.name}بنجاح`,Product)}
catch(err){
       return errorCaught(res,err)

}
    }
const createProductValidations = async(res,name,code)=>{
    try{
    const nameValid = await Products.findOne({name:name})
    if(nameValid){
        responseReturn(res,false,400,"هذا الأسم مستخدم من قبل برجاء استخدام اسم مختلف",null)
        return false;
    }
    const codeValid = await Products.findOne({code:code})
    if(codeValid){
        responseReturn(res,false,400,"هذا الكود مستخدم من قبل برجاء استخدام اسم مختلف",null)
        return false
    }
    return true;}
    catch(err){
        return errorCaught(res,err)

    }
}

export default createProduct