import Invoices from "../../models/Purchasing.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"


const addPurchaseItem = async(req,res)=>{
    const invoiceId = req.params.invoiceId
    if(!invoiceId){return  responseReturn(res,false,400,`فشل إيجاد هذة الفاتورة`,null)}
    const invoice = await Invoices.findById(invoiceId)
    if(!invoice){return  responseReturn(res,false,400,`فشل إيجاد هذة الفاتورة`,null)}
    const active = invoice.Activated
    if(active){return  responseReturn(res,false,400,`لا يمكن حذف هذة الفاتورة`,null)}
    await invoice.deleteOne()
    return responseReturn(res,true,201,`تم حذف هذة الفاتورة`,null)
}

export default addPurchaseItem