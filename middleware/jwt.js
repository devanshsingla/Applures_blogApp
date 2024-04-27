const jwt = require('jsonwebtoken');

const secretKey = "hello1234" 

const encode = (payload)=>{


    const options = {
        expiresIn : "1h",
    }

     const token = jwt.sign(payload,secretKey,options);

     return token 
}

const decode = (token) =>{
    if(!token) console.log("token missing")
    let data = jwt.decode(token,secret )
    return data
}

module.exports = {encode , decode };