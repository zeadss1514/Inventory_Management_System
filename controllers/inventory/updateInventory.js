import inventories from "../../models/Inventories.Models.js"
import Zones from "../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"


const updateSite = async(req,res)=>{
    try{     
            const {name , zone , address , active} = req.body
            const iventoryId = req.params.inventoryID
            const iventory = await inventories.findById(iventoryId)
            if(!iventory){
                    return responseReturn(res,false,400,`هذا المخزن غير موجود`,null)}
            if(name){
                const iventoryNameCheck = await inventories.findOne({name:name})
                if (iventoryNameCheck) {
                    return responseReturn(res,false,400,`هذا الأسم مستخدم من قبل برجاء استخدام اسم اخر`,null)}
                iventory.name = name}
            if(zone){
                const zoneCheck = await Zones.findById(zone)
                if (!zoneCheck) {
                    return responseReturn(res,false,400,"هذة المنطقة غير موجودة برجاءالتأكد من هذة المنطقة",null)}
                iventory.zone = zone}
            if(address){iventory.address = address}
            if(active){iventory.active = active}
            await iventory.save()
            return responseReturn(res,true,200,`تم تعديل المخزن بنجاح`,iventory)
    }
    catch(err){
                    console.log(err)
                    return errorCaught(res,err)

    }
}

export default updateSite
