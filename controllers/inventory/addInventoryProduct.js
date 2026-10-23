import inventories from "../../models/Inventories.Models.js"
import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"
import LogsModels from "../../models/Logs.Models.js"

const addInventoryProduct = async(req,res)=>{
    const {productId,quantity,minStock,maxStock,notes} = req.body
    const {inventoryID} = req.params
    const id = req.auth.id
    const inventory = await inventories.findById(inventoryID)
    if(!inventory) {
        return responseReturn(res,false,400,"هذا المخزن غير موجود برجاء التأكد من وجوده",null)
    }
    const product = await Products.findById(productId)
    if(!product)  return responseReturn(res,false,400,"هذا المنتج غير موجود برجاء التأكد من وجوده",null)
    const ProductEntry = inventory.inSiteProducts.find((item)=> item.productId.toString() === productId.toString())
    if(ProductEntry){
        ProductEntry.stock += quantity;
        await inventory.save();
            responseReturn(res,true,200,"تم إضافة المنتج بنجاح",inventory)
        await LogsModels.create({
                typeOfInvoice:"adding",
                IncomingStock: true,
                ProductId:productId,
                Quantity: quantity,
                PlaceType:"Inventories",
                Place:inventoryID,
                user:id,
        })
    return;
    }
    inventory.inSiteProducts.push({
        productId:productId,
        stock:quantity,
        minStock:minStock,
        maxStock:maxStock,
        TotalQuantity:quantity,
        notes:notes,
    })
    await inventory.save()
    responseReturn(res,true,200,"تم إضافة المنتج بنجاح",inventory)
    await LogsModels.create({
            typeOfInvoice:"adding",
            IncomingStock: true,
            ProductId:productId,
            Quantity: quantity,
            PlaceType:"Inventories",
            Place:inventoryID,
            user:id,
    })
    return;
}

export default addInventoryProduct
