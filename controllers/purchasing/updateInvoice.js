import Invoices from "../../../models/Purchasing.Models.js"
import {responseReturn,errorCaught} from "../../../helpers/response.helpers.js"


const updatedPurchaseItem = async(req,res)=>{
    const invoiceId = req.params.invoiceId
    const {purchaseToType , purchaseToId} = req.body
    let purchaseTo = null;
    if(!invoiceId){return  responseReturn(res,false,400,`فشل إيجاد هذة الفاتورة`,null)}
    let invoice = await Invoices.findById(invoiceId)
    if(!invoice){return  responseReturn(res,false,400,`فشل إيجاد هذة الفاتورة`,null)}
    if(invoice.Activated){return  responseReturn(res,false,400,`لا يمكن حذف هذة الفاتورة`,null)}
    if(purchaseToType === "Sites"){ purchaseTo = await Sites.findById(purchaseToId)}
    else if(purchaseToType === "Inventories"){ purchaseTo = await inventories.findById(purchaseToId)};
    if(!purchaseTo || !purchaseTo.active) 
            return responseReturn(res,false,400,`لا يمكن النقل او الشراء من هذة الوجهة`,null)
    invoice.purchaseToType = purchaseToType
    invoice.purchaseTo = purchaseTo
    invoice.save()

}

export default updatedPurchaseItem