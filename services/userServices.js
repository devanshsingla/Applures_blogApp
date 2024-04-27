const userModels = require("../models/userModels")

const createUser = async (params)=>{

   const result =  await userModels.createUser(params);

   return result ;
}


const userServices = {createUser};

module.exports = userServices