import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import Logs from "../../models/Logs.Models.js"

export const getAllLogs = async(req,res) =>{
    try{
        const logs = await Logs.find().populate(["user","ProductId","Place",])
        if(!logs || logs.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد اللوجز ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد اللوجز ",logs)
    }
    catch(err){
        console.log(err)
        return errorCaught(res,err)
    }
}

export const Product = async(req,res) =>{
    try{
        const {ProductId} = req.params
        const logs = await Logs.find({ProductId:ProductId}).populate(["user","ProductId","Place",])
        if(!logs || logs.length === 0){
            return responseReturn(res,false,200,"فشل في إيجاد اللوجز ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد اللوجز ",logs)
    }
    catch(err){
        return errorCaught(res,err)
    }
}
export const ProducSite = async(req,res) =>{
    try{
        const {ProductId,SiteId} = req.params
        const logs = await Logs.find({ProductId:ProductId,Place:SiteId}).populate(["user","ProductId","Place",])
        if(!logs || logs.length === 0){
            return responseReturn(res,false,200,"فشل في إيجاد اللوجز ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد اللوجز ",logs)
    }
    catch(err){
        return errorCaught(res,err)
    }
}