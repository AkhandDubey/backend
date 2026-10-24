// const asyncHandler=(func)=>{async()=>{
//     try{
//         await func(req,res,next);
//     }
//     catch(error){
//         res.status(err.code||500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }}
const asyncHandler=async(requestHandler)=>{
    (req,res,next)=>{
        req.resolve(requestHandler(req,res,next)).catch((err)=>next(err));
    }
}