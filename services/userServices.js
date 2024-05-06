const userModels = require("../models/userModels")
const userCache = require('../utils/otp')
const { validateEmail, sendEmail } = require('../utils/utils')
const { putUserCache ,checkUserLimit} = require('../utils/otp')


const createUser = async (params)=>{

   const result =  await userModels.createUser(params);

   return result ;
}

const sendOtpServices = async(params) => {
   
   const emailVerify = validateEmail(params.email)
   
   if (!emailVerify) {
      return {messasge: "Invalid Email"}
   }


   let existingUser = await userModels.getUserByEmail(params.email);
   
   const otpEmailstr = params.otp + '-' + params.email
   
   // try {
   //    const sendotp = await sendEmail(params.email)
   //    console.log("Succesfully sent ")
   // } catch (e) {
   //    console.log(e)
   // }
   let userLimit = checkUserLimit(params.email)

   if (!userLimit) {
      return {message:"Too many otp attempt"}
   };

   if (existingUser) {
      
      let value = {
         userdata: {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: params.email
         },
         expiry: Date.now() + 600000,
         existingUser : true
      }
      
      putUserCache(otpEmailstr,value)
      
      
      return params.otp
      
      
   } else {
      if (!params.firstName || !params.lastName) {
         return {message:"Enter firstName and lastName"}
      }
      let value = {
         userdata: {
            firstName: params.firstName,
            lastName: params.lastName,
            email: params.email
         },
         expiry: Date.now() + 600000,
         existingUser : false
      }
      putUserCache(otpEmailstr,value)
      
      return params.otp
   }

   

}


const userServices = { createUser ,sendOtpServices};


module.exports = userServices