import Zones from "../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const UpdateZone = async(req,res)=>{
    try{
        const zoneId = req.params.zoneID
    const {name , city , notes,active} = req.body
        const Zone = await Zones.findById(zoneId)
        if(!Zone) return responseReturn(res,false,400,"هذة المنطقة غير موجودة",null)
        if(name){
            const nameValid = await Zones.findOne({name:name})
            if(nameValid){
               return responseReturn(res,false,400,"هذا الأسم مستخدم من قبل برجاء استخدام اسم مختلف",null)
            }
            else{
                Zone.name = name
            }          
        }
        
        if(active) Zone.active = active
        if(city) Zone.city = city
        if(notes) Zone.notes = notes
        await Zone.save()
    return responseReturn(res,true,200,`تم تعديل المنطقة ${Zone.name}بنجاح`,Zone)}
       
    catch(err){
       return errorCaught(res,err)
    }
}

export default UpdateZone