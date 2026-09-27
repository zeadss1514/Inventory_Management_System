import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user" , "admin","superAdmin"],
        default:"user"
    },
    Purchase:{
        type:Boolean,
        required:true,
        default:false,
    }
    ,
    addInventory:{
        type:Boolean,
        required:true,
        default:false,
    },
    doTransactions:{
        type:Boolean,
        required:true,
        default:false,
    },
    userName:{
        type:String,
        required:true,
        unique:true,

    }
})

userSchema.pre("save",async function(){
    if (this.isModified("password")){
        try{
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password , salt)
        }
        catch(err){
            return err.message
        }
    }

})

userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}
userSchema.methods.toJSON = function(){
    const user = this.toObject({virtuals:true})
    delete user.password
    return user
}

export default mongoose.model("User",userSchema)
