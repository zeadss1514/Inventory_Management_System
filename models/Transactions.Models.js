import mongoose from 'mongoose';
const TransactionsItemSchema = mongoose.Schema({
        ProductId:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
        Quantity:{type:mongoose.Schema.Types.Double,require:true},
})

const TransactionsInvoiceSchena = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
        require: true
        },
    user:{
        type: mongoose.Schema.Types.ObjectId,ref:"User"
        , require:true,
    },
    ToType:{type:String,
        enum:["Sites","Inventories"],
        require:true,
    },
    FromType:{type:String,
        enum:["Sites","Inventories"],
        require:true,
    },
    TransactedTo:{
        type: mongoose.Schema.Types.ObjectId,refPath:"ToType"
        , require:true,
    },
    TransactedFrom:{
        type: mongoose.Schema.Types.ObjectId,refPath:"FromType"
        , require:true,
    },
    TransactedItems:{type:[TransactionsItemSchema]},
    Activated:{type:Boolean,require:true,default:false}
})

TransactionsInvoiceSchena.index({_id:1,'TransactedItems.ProductId':1},{unique:true});
export default mongoose.model("TransactionsInvoices",TransactionsInvoiceSchena)
