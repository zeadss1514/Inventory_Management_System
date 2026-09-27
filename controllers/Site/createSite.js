import Sites from "../../models/Sites.Models.js"
import Zones from "../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const createSite = async(req,res)=>{
   try{
     const {name , zone , address , active} = req.body
     if(!name)  return responseReturn(res,false,400,`برجاء ادخال اسم صحيح`,null)
     const createSiteValidator = await createsiteValidators(res,name,zone)
     if(!createSiteValidator) return;
     const Site = await Sites.create({
        name:name,
        zone:zone,
        address,address,
        active:active
     })
     if(!Site){
        return responseReturn(res,false,400,"فشل في انشاء الموقع",null)
     }
     return responseReturn(res,true,201," تم انشاء الموقع",Site)

}
     catch(err){
               return errorCaught(res,err)
     }
   
}
const createsiteValidators = async (res,name,zone) =>{
        try{
    const siteNameCheck = await Sites.findOne({name:name})
    if (siteNameCheck) {
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
    return true;}
     catch(err){
               return errorCaught(res,err)
     }
}

export default createSite