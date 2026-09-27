import mongoose from "mongoose";

const inSiteProducts = mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"Products",required:true},
    stock:{type:Number,require:true,default:0},
    minStock:{type:Number,default:0},
    maxStock:{type:Number,default:0 },
    notes:{type:String,default:"none"}
})

const siteSchema = mongoose.Schema(
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
siteSchema.index({name:1,"inSiteProducts.productId":1},{unique:true})

export default mongoose.model("Sites",siteSchema)