import Inventories from "../../models/Inventories.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"


export const getAllInventories= async(req,res)=>{
   const inventories = await Inventories.find()
    if(!inventories || inventories.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد المخزن ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد المخزن ",inventories)
}

export const getOneInventory = async(req,res)=>{
    const {inventoryID} = req.params
    if(!inventoryID)  return responseReturn(res,false,400,"برجاء إدخال ID صحيح لهذا المخزن",null)
    const inventory = await Inventories.findOne({_id:inventoryID}).populate("inSiteProducts.productId")
    if(!inventory) return responseReturn(res,false,400,"فشل في إيجاد المخزن ",null)
    return responseReturn(res,true,200,"تم إيجاد المخزن ",inventory)
}