import Invoices from "../../models/Purchasing.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import Products from "../../models/Products.Models.js"

const addPurchaseItem = async(req,res)=>{
    try{
    const invoiceId = req.params.invoiceId
    const {productId,CostPerOne,Quantity} = req.body
    console.log(req.body)
    if(!productId || !CostPerOne || !Quantity) {return responseReturn(res,false,400,`برجاء إدخال جميع البيانات`,null)}
    const invoice = await Invoices.findOne({_id:invoiceId}).populate("purchasedTo")
    if(!invoice) {return responseReturn(res,false,400,`هذة الفاتورة غير موجودة`,null)}
    if(invoice.Activated) {return responseReturn(res,false,400,`هذة الفاتورة مفعله بالفعل`,null)}
    //if(invoice.user.toString() != req.auth.id.toString()){return responseReturn(res,false,400,`هذة الفاتورة لا تنتمي إلي هذا المستخدم`,null)}
    //if(!(req.auth.Purchase)) {return responseReturn(res,false,400,``,null)} 
    const ProductEntry = invoice.InvoiceItems.find((item)=> item.ProductId.toString() === productId.toString())
    
    if(ProductEntry){return responseReturn(res,false,400,`هذا المنتج موجود بالفعل`,null)}
    const product = await Products.findById(productId)
    console.log(invoice.purchasedTo)
    if(!product) {return responseReturn(res,false,400,`هذا المنتج غير موجود بالفعل`,null)}
    const SiteproductEntry = invoice.purchasedTo.inSiteProducts?.find(
        (p) => p.productId.toString() === productId.toString()
    );
    if(SiteproductEntry){
        const nextStock = SiteproductEntry.stock + Quantity
        if((SiteproductEntry.maxStock != 0) && nextStock > SiteproductEntry.maxStock){
            
            return responseReturn(res,false,400,`الكمية المحددة أعلي من مساحة التخزين المتاحة في هذا الموقع`,null)        }
        }
    const TotalCost = CostPerOne * Quantity
    await invoice.InvoiceItems.push({
        ProductId:productId,
        CostPerOne:CostPerOne,
        Quantity:Quantity,
        TotalCost:TotalCost
    })
    //invoice.user = req.auth.id
    await invoice .save()
    return responseReturn(res,true,201, `تم إضافةالمنتج للفاتورة`,invoice)
}
catch (err){
        return errorCaught(res,err)

}}

export default addPurchaseItem