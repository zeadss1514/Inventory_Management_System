import mongoose from "mongoose";

const Logs = mongoose.Schema({
    // logString:{type:String,
    // },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,ref:"User",
        require:true,
    },
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Products"
    },
    PlaceType:{
        type:String,
        enum:["Sites","Inventories"],},
    Place:{
        type: mongoose.Schema.Types.ObjectId,refPath:"PlaceType",
    },
    Quantity:{type:mongoose.Schema.Types.Double},
    typeOfInvoice:{
        type:String,
        enum:["Usage","Invoices","TransactionsInvoices","adding"]},
    invoice:{type: mongoose.Schema.Types.ObjectId,refPath:"typeOfInvoice",},
    IncomingStock:{type:Boolean,default:false}

})

export default mongoose.model("Logs",Logs)