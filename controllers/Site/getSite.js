import Sites from "../../models/Sites.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"



export const getSite = async(req,res)=>{
    const sites = await Sites.find()
    if(!sites || sites.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد الموقع ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد الموقع ",sites)
}

export const getOneSite = async(req,res)=>{
    const {siteID} = req.params
    if(!siteID)  return responseReturn(res,false,400,"برجاء إدخال ID صحيح لهذا الموقع",null)
    const site = await Sites.findOne({_id:siteID}).populate("inSiteProducts.productId")
    if(!site) return responseReturn(res,false,400,"فشل في إيجاد الموقع ",null)
    return responseReturn(res,true,200,"تم إيجاد الموقع ",site)
}