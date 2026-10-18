const responseReturn = (res,success,statusNumber,message,data)=>{
    return res.status(statusNumber).json({success:success,message:message,data:data})
}
const errorCaught = (res,error) =>{
    return responseReturn(res,false,500,{message:error.message,},null)
}

export {responseReturn,errorCaught}