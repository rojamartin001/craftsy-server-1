const jwt =require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside middleware");
    const token = req.headers['authorization']?.split(" ")[1]
    console.log(token);
    if(token!=''){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.userId = jwtResponse.userId
            //  next() // proceed only if token is valid
        }catch(err){
           res.status(401).json("authorisation failed...please login")
        }
    }else{
        res.status(404).json("Authorisation failed...Token is Missing...!!")
    }
     next()
    
}

module.exports = jwtMiddleware