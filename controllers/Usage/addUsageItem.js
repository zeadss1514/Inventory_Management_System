import Usage from "../../models/Usage.Models.js"
import Products from "../../models/Products.Models.js"

import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const addUsageItem = async(req,res)=>{
    try{
    const usageID = req.params.usageID
    const {productId,Quantity} = req.body
    const {id,} = req.auth
    const doUsage = req.auth.Usage
    if(!id || !doUsage) return responseReturn(res,false,400,`لا يمكنك انشاء الأستهلاك`,null)
    if(!productId || !Quantity) {return responseReturn(res,false,400,`برجاء إدخال جميع البيانات`,null)}
    const usage = await Usage.findOne({_id:usageID}).populate("useageFrom")
    if(!usage) {return responseReturn(res,false,400,`هذة الفاتورة غير موجودة`,null)}
    if(usage.Activated) {return responseReturn(res,false,400,`هذة الفاتورة مفعله بالفعل`,null)}
    if(usage.user.toString() != id.toString()){return responseReturn(res,false,400,`هذة الفاتورة لا تنتمي إلي هذا المستخدم`,null)}
    const ProductEntry = usage.UsageItems.find((item)=> item.ProductId.toString() === productId.toString())
    if(ProductEntry){return responseReturn(res,false,400,`هذا المنتج موجود بالفعل`,null)}
    const product = await Products.findById(productId)
    if(!product) {return responseReturn(res,false,400,`هذا المنتج غير موجود بالفعل`,null)}
    const SiteproductEntry = usage.useageFrom.inSiteProducts?.find(
        (p) => p.productId.toString() === productId.toString()
    );
    if(SiteproductEntry){
        const nextStock = SiteproductEntry.stock - Quantity
        if((SiteproductEntry.minStock != 0) && nextStock < SiteproductEntry.minStock){
            
            return responseReturn(res,false,400,`الكمية المحددة أقل من الحد الأدني في هذا الموقع`,null)        }
        }
    await usage.UsageItems.push({
        ProductId:productId,
        Quantity:Quantity,
    })
    //invoice.user = req.auth.id
    await usage .save()
    return responseReturn(res,true,201, `تم إضافةالمنتج للفاتورة`,usage)
}
catch (err){
        return errorCaught(res,err)

}}

export default addUsageItem