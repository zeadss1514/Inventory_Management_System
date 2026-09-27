import mongoose from 'mongoose';
const InvoiceItemSchema = mongoose.Schema({
        ProductId:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
        CostPerOne: {type:mongoose.Schema.Types.Double,require:true},
        Quantity:{type:mongoose.Schema.Types.Double,require:true},
        TotalCost: {type:mongoose.Schema.Types.Double,require:true},

})
const PurchasingInvoiceSchena = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
        require: true
        },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,ref:"User"
    //     , require:true,
    // },
    purchaseToType:{type:String,
        enum:["Sites","Inventories"],
        require:true,},
    purchasedTo:{
        type: mongoose.Schema.Types.ObjectId,refPath:"purchaseToType"
        , require:true,
    },
    totalcost:{
        type:mongoose.Schema.Types.Double,
        require:true,
        default:0.00
    },
    InvoiceItems:{type:[InvoiceItemSchema]},
    Activated:{type:Boolean,require:true,default:false}
})

PurchasingInvoiceSchena.index({_id:1,'InvoiceItems.ProductId':1},{unique:true});

PurchasingInvoiceSchena.pre("save",async function(){
  this.totalcost = this.InvoiceItems.reduce((sum, item) => {
    return sum + (item.TotalCost || 0); }, 0);
})
export default mongoose.model("Invoices",PurchasingInvoiceSchena)