const jwt = require('jsonwebtoken');

const isAuthencticated = async(req,res,next)=>{
  try{
   const token=req.cookies.token;
   if(!token){
    return res.status(401).json({message:"user not Authenticated"})
   };
   const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
  //  console.log(decode);
   if(!decode){
    return res.status(400).json({message:"Invalid token"});
   }
   req.id=decode.userID;
   next();
  }catch(error){
   console.log(error);
  }
}

module.exports= isAuthencticated ;