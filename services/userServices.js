const userModels = require('../models/userModels');
const userCache = require('../utils/otp');
const { validateEmail, sendEmail } = require('../utils/utils');
const { putUserCache, checkUserLimit } = require('../utils/otp');
const { encode } = require('../middleware/jwt');

const createUser = async (params) => {
  const result = await userModels.createUser(params);

   return result;        


   
};

const sendOtpServices = async (params) => {
  const emailVerify = validateEmail(params.email);

  if (!emailVerify) {
    return { messasge: 'Invalid Email' };
  }

  let existingUser = await userModels.getUserByEmail(params.email);

  const otpEmailstr = params.otp + '-' + params.email;

  let userLimit = checkUserLimit(params.email);

  if (!userLimit) {
    return { message: 'Too many otp attempt' };
  }

  try {
    await sendEmail(params.email, params.otp);
  } catch (e) {
    return { message: e };
  }

  if (existingUser) {
    let value = {
      userdata: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: params.email,
      },
      expiry: Date.now() + 600000,
      existingUser: true,
    };

    putUserCache(otpEmailstr, value);

    return params.otp;
  } else {
    if (!params.firstName || !params.lastName) {
      return { message: 'Enter firstName and lastName' };
    }
    let value = {
      userdata: {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
      },
      expiry: Date.now() + 600000,
      existingUser: false,
    };
    putUserCache(otpEmailstr, value);

    return params.otp;
  }
};

const verifyOTPServices = async (params) => {
  let userData;
  let otp;

  Object.keys(userCache.userCache).forEach((key) => {
    let emailotpstr = key.split('-');

    if (params.email == emailotpstr[1]) {
      userData = userCache.userCache[key];

      otp = emailotpstr[0];
    }
  });
  if (!userData) {
    return { message: 'No OTP exists!' };
  }
  
  if (!otp == params.otp) {
    return { message: 'Invalid OTP' };
  }

  if (!userData.existingUser) {
    let newUser = {
      firstName: userData.userdata.firstName,
      lastName: userData.userdata.lastName,
      email: params.email,
    };

    try {
       let result = await userModels.createUser(newUser);
       let userID = await userModels.getUserByEmail(params.email)
       newUser["userID"] = userID.id;
      let token = await encode(newUser);
      return { message: 'user created succesfully', token: token };
    } catch (e) {
      return console.log(e);
    }
  }
  let userID = await userModels.getUserByEmail(params.email);
   userData.userdata["userid"] = userID.id;
  let token = await encode(userData.userdata);
  return { message: 'Logged in succesfully', token: token };
};

const userServices = { createUser, sendOtpServices, verifyOTPServices };

module.exports = userServices;
