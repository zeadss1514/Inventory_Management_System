import inventories from "../../models/Inventories.Models.js"
import Zones from "../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const createInventory= async(req,res)=>{
   try{
     const {name , zone , address , active} = req.body
     if(!name)  return responseReturn(res,false,400,`برجاء ادخال اسم صحيح`,null)
     const createInventoryValidator = await createInventoryValidators(res,name,zone)
     if(!createInventoryValidator) return;
     const inventory = await inventories.create({
        name:name,
        zone:zone,
        address,address,
        active:active
     })
     if(!inventory){
        return responseReturn(res,false,400,"فشل في انشاء المخزن",null)
     }
     return responseReturn(res,true,201," تم انشاء المخزن",inventory)

}
     catch(err){
               return errorCaught(res,err)
     }
   
}
const createInventoryValidators = async (res,name,zone) =>{
        try{
                const inventoryNameCheck = await inventories.findOne({name:name})
                if (inventoryNameCheck) {
                        responseReturn(res,false,400,`هذا الأسم مستخدم من قبل برجاء استخدام اسم اخر`,null)
                        return false;
                }
                if(zone){
                        
                        const zoneCheck = await Zones.findById(zone)
                        if (!zoneCheck) {
                                responseReturn(res,false,400,"هذة المنطقة غير موجودة برجاءالتأكد من هذة المنطقة",null)
                                return false;
                        }
                } 
                return true;
            }
     catch(err){
               return errorCaught(res,err)
     }
}

export default createInventory