import Zones from "../../../models/Zone.Models.js"
import {responseReturn,errorCaught} from "../../../helpers/response.helpers.js"

const createZone = async(req,res)=>{
try{
    const {name , city , code , notes,active} = req.body
    if(!name || code) return responseReturn(res,false,400,"تأكد من أدخال جميع البيانات",null)
    const ZoneValid = createZoneValidations(res,name,code)
    if(!ZoneValid) return;
    const Zone = await Zones.create({
        name:name,
        code:code,
        city:city,
        notes:notes,
        active:active
    })
    if(!Zone) 
        return responseReturn(res,false,400,"فشل في انشاء منطقة جديدة",null)
    return responseReturn(res,true,201,`تم انشاء المنطقة بنجاح ${Zone.name}بنجاح`,Zone)}
catch(err){
       return errorCaught(res,err)

}
    }
const createZoneValidations = async(res,name,code)=>{
    try{
        const nameValid = await Zones.findOne({name:name})
        if(nameValid){
            responseReturn(res,false,400,"هذا الأسم مستخدم من قبل برجاء استخدام اسم مختلف",null)
            return false;
        }
        const codeValid = await Zones.findOne({code:code})
        if(codeValid){
            responseReturn(res,false,400,"هذا الكود مستخدم من قبل برجاء استخدام اسم مختلف",null)
            return false
        }
        return true;
    }
    catch(err){
        return errorCaught(res,err)

    }
}

export default createZone