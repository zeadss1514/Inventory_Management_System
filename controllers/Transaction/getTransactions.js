import Transactions from "../../models/Transactions.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

export const getTransact = async(req,res)=>{
    const transactions = await Transactions.find().populate(["TransactedTo","TransactedFrom"])
    if(!transactions || transactions.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد الموقع ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد الموقع ",transactions)
}

export const getOneTransac = async(req,res)=>{
    const {transactionID} = req.params
    if(!transactionID)  return responseReturn(res,false,400,"برجاء إدخال ID صحيح لهذا الموقع",null)
    const transaction = await Transactions.findOne({_id:transactionID})
    if(!transaction) return responseReturn(res,false,400,"فشل في إيجاد الموقع ",null)
    return responseReturn(res,true,200,"تم إيجاد الموقع ",transaction)
}