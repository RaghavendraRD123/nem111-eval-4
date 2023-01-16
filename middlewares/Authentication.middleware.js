const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const Authentication = async(req,res,next) => {
    const token = req.headers.token;
        if(token){
            jwt.verify(token, process.env.key, (err, decoded) =>{
                if(err){
                    res.send({"err":"login first auth"})
                }else{
                    console.log("d",decoded)
                    req.body.userId=decoded.userId;
                    next()
                }
              });
        }else{
            res.send({"err":"login first auth2"})
        }
}

module.exports = {
    Authentication
}