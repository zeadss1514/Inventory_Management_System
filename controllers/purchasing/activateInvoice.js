import Invoices from "../../models/Purchasing.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
// next feature make middleware for invoices
const activateInvoice = async(req,res)=>{
    const invoiceId = req.params.invoiceId
    const invoice = await Invoices.findOne({_id:invoiceId}).populate("purchasedTo")
    if(!invoice){return responseReturn(res,false,400,`هذة الفاتورة غير موجوده `,null)}
    if(invoice.Activated){return responseReturn(res,false,400,`هذة الفاتورة مفعله بالفعل`,null)}
    const targetSite = invoice.purchasedTo.constructor
    const targetId  =   invoice.purchasedTo._id
    if(invoice.Activated) {return responseReturn(res,false,400,`هذة الفاتورة مفعله بالفعل`,null)}
    //if(invoice.user.toString() != req.auth.id.toString()){return responseReturn(res,false,400,`هذة الفاتورة لا تنتمي إلي هذا المستخدم`,null)}
    if(invoice.InvoiceItems.length<1) return  responseReturn(res,false,400,`هذة الفاتورة لا يوجد بها منتجات `,null)
    for (const item of invoice.InvoiceItems){
        const {ProductId , Quantity} = item
        const updateResult = await targetSite.updateOne(
          { _id: targetId, "inSiteProducts.productId": ProductId },
          { $inc: { "inSiteProducts.$.stock": Quantity } }
            )
      if (updateResult.matchedCount === 0)
        await targetSite.updateOne(
            { _id: targetId },
            { $push: { inSiteProducts: { ProductId, stock: Quantity } } }
            )
    }
  invoice.Activated = true;
  await invoice.save();
  return responseReturn(res,true,201,`تم تفعيل الفاتورة  `,invoice)
}

export default activateInvoice