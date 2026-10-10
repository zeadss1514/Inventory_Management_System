import mongoose from 'mongoose';
const UsageItemSchema = mongoose.Schema({
        ProductId:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
        Quantity:{type:mongoose.Schema.Types.Double,require:true},
})
const UsageInvoiceSchena = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
        require: true
        },
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,ref:"User"
    //     , require:true,
    // },
    useageFromType:{type:String,
        enum:["Sites","Inventories"],
        require:true,},
    useageFrom:{
        type: mongoose.Schema.Types.ObjectId,refPath:"useageFromType"
        , require:true,
    },
    UsageItems:{type:[UsageItemSchema]},
    Activated:{type:Boolean,require:true,default:false}
})

UsageInvoiceSchena.index({_id:1,'UsageItems.ProductId':1},{unique:true});

export default mongoose.model("Usage",UsageInvoiceSchena)