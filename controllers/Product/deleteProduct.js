import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const deleteProdcut = async(req,res)=>{
    try{
    const productId = req.params.ID
    const DeletedProduct = Products.findByIdAndDelete(productId)
    if(!DeletedProduct){return responseReturn(res,false,400,"فشل في حذف المنتج ",null)}
    return responseReturn(res,true,200,"تم حذف المنتج بنجاح",DeletedProduct)
    }
catch(err){
       return errorCaught(res,err)
}}

export default deleteProdcut