import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const UpdateProduct = async(req,res)=>{
    try{
        const ProductId = req.params.ProductID
        const {active,name, description,measurementUnit,freezed} = req.body
        const Product = await Products.findById(ProductId)
        if(!Product)   return responseReturn(res,false,400,"لم يتم ايجاد المنتج",null)

        if(name){
            const nameValid = await Products.findOne({name:name})
            if(nameValid){
               return responseReturn(res,false,400,"هذا الأسم مستخدم من قبل برجاء استخدام اسم مختلف",null)
            }          
        }
        if(active) Product.active = active
        if(description) Product.description = description
        console.log(measurementUnit)
        if(measurementUnit) Product.measurementUnit = measurementUnit
        if(freezed) Product.freezed = freezed
        await Product.save()
    return responseReturn(res,true,200,`تم تعديل المنتج ${Product.name}بنجاح`,Product)}
       
    catch(err){
       return errorCaught(res,err)
    }
}

export default UpdateProduct