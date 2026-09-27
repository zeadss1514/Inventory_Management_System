import Transactions from "../../models/Transactions.Models.js"
import Products from "../../models/Products.Models.js"
import {responseReturn,errorCaught} from "../../helpers/response.helpers.js"

const addTransactionItem = async(req,res)=>{
try{
    const transactID = req.params.transactID
    const {productId,Quantity} = req.body
    if(!productId || !Quantity || !transactID) {return responseReturn(res,false,400,`برجاء إدخال جميع البيانات`,null)}
    const TransactionInvoice = await Transactions.findOne({_id:transactID}).populate(["TransactedTo","TransactedFrom"])
    if(!TransactionInvoice) {return responseReturn(res,false,400,`بيان النقل غير موجود`,null)}
    if(TransactionInvoice.Activated) {return responseReturn(res,false,400,`بيان النقل مفعل بالفعل`,null)}
    //if(TransactionInvoice.user.toString() != req.auth.id.toString()){return responseReturn(res,false,400,`هذة الفاتورة لا تنتمي إلي هذا المستخدم`,null)}
    //if(!(req.auth.Transact)) {return responseReturn(res,false,400,``,null)} // create middleware for it later just for test
    const ProductEntry = TransactionInvoice.TransactedItems.find((item)=> item.ProductId.toString() === productId.toString())
    if(ProductEntry){return responseReturn(res,false,400,`هذا المنتج موجود بالفعل`,null)}
    const product = await Products.findById(productId)
    if(!product) {return responseReturn(res,false,400,`هذا المنتج غير موجود بالفعل`,null)}
    
    const FromproductEntry = TransactionInvoice.TransactedFrom.inSiteProducts?.find(
        (p) => p.productId.toString() === productId.toString()
    );
    if(!FromproductEntry || FromproductEntry.stock < 0 || (FromproductEntry.stock - Quantity) < FromproductEntry.minStock)
        return responseReturn(res,false,400,`هذا المنتج غير موجود بالمخزن او المخزون الموجود غير كافي`,null)
    const ToProductEntry = TransactionInvoice.TransactedTo.inSiteProducts.find((p)=>p.productId.toString() === productId.toString())
    if(ToProductEntry && ToProductEntry.maxStock < (ToProductEntry.stock + Quantity) && ToProductEntry.maxStock != 0 ){
            return responseReturn(res,false,400,`مساحة التخزين الموجودة غير كافية برجاء زيادة مساحةالتخزين أو تقليل الكمية المنقولة`,null)
    }
    await TransactionInvoice.TransactedItems.push({
        ProductId:productId,
        Quantity:Quantity,
    })
    await TransactionInvoice .save()
    return responseReturn(res,true,201,`تم إضافةالمنتج بيان النقل`,null)
}
catch(err){
        console.log(err)

       return errorCaught(res,err)
}}

export default addTransactionItem