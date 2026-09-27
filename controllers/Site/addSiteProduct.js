import Sites from "../../models/Sites.Models.js"
import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import LogsModels from "../../models/Logs.Models.js"

const addSiteProduct = async(req,res)=>{
    const {productId,Quantity,minStock,maxStock,notes} = req.body
    const {siteID} = req.params
    const site = await Sites.findById(siteID)
    if(!site) {
        return responseReturn(res,false,400,"هذا الموقع غير موجود برجاء التأكد من وجوده",null)
    }
    const ProductEntry = site.inSiteProducts.find((item)=> item.productId.toString() === productId.toString())
    if(ProductEntry){
        ProductEntry.stock += Quantity;
        await site.save();
            responseReturn(res,true,200,"تم إضافة المنتج بنجاح",site)
    const logString = `تم زيادة المنتج ${product.name}إلي الموقع ${site.name} بمقدار ${quantity}${product.measurementUnit} ليصبح الإجمالي ${product.stock}${product.measurementUnit}`
    LogsModels.create({logSting:logString})
    return;
    }
    const product = await Products.findById(productId)
    if(!product)  return responseReturn(res,false,400,"هذا المنتج غير موجود برجاء التأكد من وجوده",null)
    site.inSiteProducts.push({
        productId:productId,
        stock:Quantity,
        minStock:minStock,
        maxStock:maxStock,
        notes:notes,
    })
    await site.save()
    responseReturn(res,true,200,"تم إضافة المنتج بنجاح",site)
    const logString = `تم إضافة المنتج ${product.name}إلي الموقع ${site.name} بمقدار ${quantity}${product.measurementUnit}`
    LogsModels.create({logSting:logString})
    return;

}
export default addSiteProduct