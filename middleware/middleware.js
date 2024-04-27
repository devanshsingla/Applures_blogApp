const {decode} = require('./jwt');

const auth = (req,res,next)=>{
    try{
    if(token){
        
        let user = decode(token);

        let userid = user.id

       next()
    }else{
        res.json({message:"Unauthorized user"})
    }
   }catch(e){
    console.log(e)
    res.json({message:"Unauthorized user"})
   }

}

module.exports = {auth};