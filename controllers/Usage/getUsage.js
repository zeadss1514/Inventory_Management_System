import Usage from "../../models/Usage.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"


export const getUsage = async(req,res)=>{
    const usage = await Usage.find().populate("useageFrom").populate("useageFrom")
    // if(!usage || usage.length === 0){
    //         return responseReturn(res,false,400,"فشل في إيجاد الفاتورة ",null)
    //     }
        return responseReturn(res,true,200,"تم إيجاد الفاتورة ",usage)

}


export const getOneUsage = async(req,res) =>{
    const {usageID} = req.params
    const usage = await Usage.findOne({_id:usageID}).populate("useageFrom")
    if(!usage){
            return responseReturn(res,false,400,"فشل في إيجاد الفاتورة ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد الفاتورة ",usage)
}
