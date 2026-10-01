import Zones from "../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"


export const getZone = async(req,res)=>{
    try{
        
        const zones = await Zones.find()
        if(!zones || zones.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد المنطقة ",null)
        }
        return responseReturn(res,true,200,"تم إيجاد المنطقة ",zones)
    }
    catch(err){
        console.log(err)
        return errorCaught(res,err)
    }
}

export const getOneZone = async(req,res)=>{
    try{
    const {zoneID} = req.params
    if(!zoneID)  return responseReturn(res,false,400,"برجاء إدخال ID صحيح لهذه المنطقة",null)
    const zone = await Zones.findOne({_id:zoneID})
    if(!zone) return responseReturn(res,false,400,"فشل في إيجاد المنطقة ",null)
    return responseReturn(res,true,200,"تم إيجاد المنطقة ",zone)
   }
    catch(err){
        console.log(err)
        return errorCaught(res,err)
    }
}