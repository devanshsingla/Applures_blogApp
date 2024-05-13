
const { decode } = require('./jwt');

const auth = (req, res, next) => {
  if (!req.headers['authorization']) {
   return res.status(400).json({message:"No token"})
  }
  
  let token = req.headers['authorization']
  let newtoken = token.substring(7,token.length)
  let user;
  try {
    user = decode(newtoken);
  } catch (e) {
    return res.status(400).json({ message: "unauthorized user" });
  }
  req.user = user;
  
  next()
};

module.exports = { auth };
