import mongoose from "mongoose";

const zonesSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
        city:{
        type:String,
        require:true,
        default:"الأسكندرية"
    },
        code:{
            type:String,
            require:true,
            unique:true
        },

        notes:{
            type:String,
        },
        active:{
            type:Boolean,
            require:true,
            default:true,
        },
})

export default mongoose.model("Zones",zonesSchema)