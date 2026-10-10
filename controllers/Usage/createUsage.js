import inventories from "../../models/Inventories.Models.js"
import Sites from "../../models/Sites.Models.js"
import Usage from "../../models/Usage.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

// create validators for the type to be enum one of 2 "Sites","Inventories"
const createUsageInvoice = async(req,res)=>{
    try{
        const {usedFromType , usedFromId} = req.body
        let useageFrom = null;
        if(usedFromType === "Sites"){ useageFrom = await Sites.findById(usedFromId)}
        else if(usedFromType === "Inventories"){ useageFrom = await inventories.findById(usedFromId)};
        if(!useageFrom || !useageFrom.active) 
                return responseReturn(res,false,400,`لا يمكن الأستهلاك من هذة الوجهة`,null)
        const usage = await Usage.create({
            //user:req.auth.id,
            useageFromType:usedFromType,
            useageFrom:usedFromId,})
        if(!usage) return responseReturn(res,false,400,`تعذر إنشاءالفاتورة`,null)
        return responseReturn(res,true,201,`تم إنشاءالفاتورة`,[usage,useageFrom])
    }
catch(err){
    return errorCaught(res,err)
}
}

export default createUsageInvoice
