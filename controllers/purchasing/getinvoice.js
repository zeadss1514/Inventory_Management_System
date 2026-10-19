import Invoices from "../../models/Purchasing.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"


export const getInvoice = async(req,res)=>{
    const invoices = await Invoices.find({Activated:true}).populate(["purchasedTo","user"])
    if(!invoices || Invoices.length === 0){
            return responseReturn(res,false,400,"فشل في إيجاد الفاتورة ",null)
        }
        return responseReturn(res,true,200,"تم إيجاد الفاتورة ",invoices)

}


export const getOneInvoice = async(req,res) =>{
    const {invoiceId} = req.params
    const invoice = await Invoices.findOne({_id:invoiceId}).populate(["purchasedTo","user"])
    if(!invoice){
            return responseReturn(res,false,400,"فشل في إيجاد المنتج ",null)
        }
    return responseReturn(res,true,200,"تم إيجاد المنتج ",invoice)
}
