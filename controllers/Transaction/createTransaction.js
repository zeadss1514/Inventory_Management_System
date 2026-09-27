import Sites from "../../models/Sites.Models.js"
import inventories from "../../models/Inventories.Models.js"
import Transactions from "../../models/Transactions.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const createTransactions = async(req,res)=>{
    const {ToType,FromType,TransactedToId,TransactedFromId} = req.body
    let transactedFrom = null, transactedto = null;
    if(FromType === "Sites"){ transactedFrom = await Sites.findById(TransactedFromId)}
    else if(FromType === "Inventories"){ transactedFrom = await inventories.findById(TransactedFromId)};
    if(!transactedFrom || !transactedFrom.active) 
            return responseReturn(res,false,400,`لا يمكن النقل او الشراء من هذة الوجهة`,null)
    if(ToType === "Sites"){ transactedto = await Sites.findById(TransactedToId)}
    else if(ToType === "Inventories"){ transactedto = await inventories.findById(TransactedToId)};
    if(!transactedto || !transactedto.active) 
            return responseReturn(res,false,400,`لا يمكن النقل او الشراء إلى هذة الوجهة`,null)
    const transactionInvoice = await Transactions.create({
        //user:req.auth.id,
        ToType:ToType,
        FromType:FromType,
        TransactedTo:transactedto,
        TransactedFrom:transactedFrom,
    })
    if(!transactionInvoice){
         return responseReturn(res,false,400,`فشل في انشاء بيان النقل`,null)
    }
    return responseReturn(res,true,201,`تم انشاء بيان النقل`,transactionInvoice)
}

export default createTransactions