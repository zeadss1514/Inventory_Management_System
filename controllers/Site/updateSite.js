import Sites from "../../models/Sites.Models.js"
import Zones from "../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"


const updateSite = async(req,res)=>{
    try{     
            const {name , zone , address , active} = req.body
            const siteID = req.params.ID
            const site = await Sites.findById(siteID)
            if(!site){
                    return responseReturn(res,false,400,`هذا الموقع غير موجود`,null)}
            if(name){
                const siteNameCheck = await Sites.findOne({name:name})
                if (siteNameCheck) {
                    return responseReturn(res,false,400,`هذا الأسم مستخدم من قبل برجاء استخدام اسم اخر`,null)}
                site.name = name}
            if(zone){
                const zoneCheck = await Zones.findById(zone)
                if (!zoneCheck) {
                    return responseReturn(res,false,400,"هذة المنطقة غير موجودة برجاءالتأكد من هذة المنطقة",null)}
                site.zone = zone}
            if(address){site.address = address}
            if(active){site.active = active}
            await site.save()
            return responseReturn(res,true,200,`تم تعديل الموقع بنجاح`,site)
    }
    catch(err){
                    return errorCaught(res,err)

    }
}

export default updateSite