import mongoose from "mongoose";

const Logs = mongoose.Schema({
    logSting:{type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("Logs",Logs)