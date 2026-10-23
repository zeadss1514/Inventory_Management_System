import Sites from "../../models/Sites.Models.js"
import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import LogsModels from "../../models/Logs.Models.js"

const addSiteProduct = async(req,res)=>{
    const {productId,quantity,minStock,maxStock,notes} = req.body
    const {siteID} = req.params
    const id = req.auth.id
    const site = await Sites.findById(siteID)
    if(!site) {
        return responseReturn(res,false,400,"هذا الموقع غير موجود برجاء التأكد من وجوده",null)
    }
    const ProductEntry = site.inSiteProducts.find((item)=> item.productId.toString() === productId.toString())
    if(ProductEntry){
        ProductEntry.stock += quantity;
        ProductEntry.TotalQuantity += quantity;
        await site.save();
            responseReturn(res,true,200,"تم إضافة المنتج بنجاح",site)
    await LogsModels.create({
            typeOfInvoice:"adding",
            IncomingStock: true,
            ProductId:productId,
            Quantity: quantity,
            PlaceType:"Sites",
            Place:siteID,
            user:id,
    })
    return;
    }
    const product = await Products.findById(productId)
    if(!product)  return responseReturn(res,false,400,"هذا المنتج غير موجود برجاء التأكد من وجوده",null)
    site.inSiteProducts.push({
        productId:productId,
        stock:quantity,
        minStock:minStock,
        maxStock:maxStock,
        TotalQuantity:quantity,
        notes:notes,
    })
    await site.save()
    responseReturn(res,true,200,"تم إضافة المنتج بنجاح",site)
    await LogsModels.create({
            typeOfInvoice:"adding",
            IncomingStock: true,
            ProductId:productId,
            Quantity: quantity,
            PlaceType:"Sites",
            Place:siteID,
            user:id,
    })
    return;

}
export default addSiteProduct