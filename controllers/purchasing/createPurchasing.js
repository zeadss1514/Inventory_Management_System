import inventories from "../../models/Inventories.Models.js"
import Sites from "../../models/Sites.Models.js"
import Invoices from "../../models/Purchasing.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

// create validators for the type to be enum one of 2 "Sites","Inventories"
const createPurchaseInvoice = async(req,res)=>{
    try{
        const {purchaseToType , purchaseToId} = req.body
        let purchaseTo = null;
        if(purchaseToType === "Sites"){ purchaseTo = await Sites.findById(purchaseToId)}
        else if(purchaseToType === "Inventories"){ purchaseTo = await inventories.findById(purchaseToId)};
        if(!purchaseTo || !purchaseTo.active) 
                return responseReturn(res,false,400,`لا يمكن النقل او الشراء من هذة الوجهة`,null)
        const invoice = await Invoices.create({
            //user:req.auth.id,
            purchaseToType:purchaseToType,
            purchasedTo:purchaseToId,})
        if(!invoice) return responseReturn(res,false,400,`تعذر إنشاءالفاتورة`,null)
        return responseReturn(res,true,201,`تم إنشاءالفاتورة`,[invoice,purchaseTo])
    }
catch(err){
    return errorCaught(res,err)
}
}

export default createPurchaseInvoice
