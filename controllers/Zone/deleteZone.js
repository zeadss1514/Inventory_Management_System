import Zones from "../../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../../helpers/response.helpers.js"

const deleteZone = async(req,res)=>{
    try{
    const zoneId = req.params.ID
    const DeletedZone = Zones.findByIdAndDelete(zoneId)
    if(!DeletedZone){return responseReturn(res,false,400,"فشل في حذف المنطقة ",null)}
    return responseReturn(res,true,200,"تم حذف المنطقة بنجاح",DeletedZone)
    }
catch(err){
       return errorCaught(res,err)
}}

export default deleteZone