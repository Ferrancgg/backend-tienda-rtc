const setError=(err,req,res,next)=>{

    const statusCode=err.statusCode||500
    const message=err.message||"internal error"
    return res.status(statusCode).json({success:false,error:message})


}
module.exports=setError

