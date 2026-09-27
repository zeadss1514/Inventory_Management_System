import mongoose from "mongoose";

const inSiteProducts = mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
    stock:{type:Number,require:true,default:0},
    minStock:{type:Number,default:0},
    maxStock:{type:Number,default:0},
    notes:{type:String,default:"none"},
    lastPurchasedPrice:{type:mongoose.Schema.Types.Double,default:0.00}
})

const InventoriesSchema = mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
            unique:true,
        },
        zone:{
            type:mongoose.Schema.Types.ObjectId,ref:"Zones",
        },
        address:{
            type:String,
            require:true,
        },
        active:{
            type:Boolean,
            require:true,
            default:true,
        },
        
        inSiteProducts:{type:[inSiteProducts]},
    }
)
InventoriesSchema.index({name:1,"InventoriesProducts.productId":1},{unique:true})

export default mongoose.model("Inventories",InventoriesSchema)