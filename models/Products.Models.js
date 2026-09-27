import mongoose from 'mongoose'

const productsSchema = mongoose.Schema({
    freezed:{
        type:Boolean,
        require:true,
        default:false
    },
    active:{
        type:Boolean,
        require:true,
        default:true
    },
    name:{
        require:true,
        type:String,
        unique:true
        },
    measurementUnit:{type:String,require:true,default:"طن"},
    code:{
        require:true,
        type:Number,
        unique:true,
    },
    description:{
        type:String,
    }
})

export default mongoose.model("Products",productsSchema)