const fs = require('fs');
const {
  hashPassword,
  comparePassword,
  validateEmail,
  sendEmail,
  uploadFile,
} = require('../utils/utils');
const userServices = require('../services/userServices');
const { decode, encode } = require('../middleware/jwt');
const {
  getUserByEmail,
  getAllUser,
  OTPstore,
  verifyOTP,
  getUser,
  CreateUserOTP,
  login_history,
  updateUser,
  uploadImageModels,
  getImage,
} = require('../models/userModels');

const redis = require('redis');
const { DATE } = require('sequelize');
const { error } = require('console');
const client = redis.createClient();

const createUser = async (req, res, next) => {
  console.log(req.body);
  if (
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.number ||
    !req.body.password
  ) {
    res.status(400).json({ message: 'Input data missing ' });
  }
  const isValidEmail = validateEmail(req.body.email);
  if (!isValidEmail) {
    return res.status(400).json({ message: 'email not valid ' });
  }

  if (req.body.number.length != 10) {
    return res.json({ message: 'Phone number should be 10 number long' });
  }

  const password = await hashPassword(req.body.password);

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: password,
    email: req.body.email,
    number: req.body.number,
  };
  const result = await userServices.createUser(newUser);
  console.log(result);
  try {
    res.status(201).json({ message: 'Succesfully created !' });
  } catch (e) {
    res.status(400).json({ message: result });
  }
};

const loginUser = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({ message: 'Enter password or email' });
  }

  try {
    let user = await getUserByEmail(req.body.email);
  } catch (e) {
    console.log(e);
  }

  let correct_password = await comparePassword(
    req.body.password,
    user.password,
  );

  if (!correct_password) {
    return res.status(400).json({ message: 'Unauthorized user ' });
  }

  let payload = { userID: user.id, email: user.email };

  let token = encode(payload);

  console.log(token);
  res.token;
};
const getAllusercontroller = async (req, res, next) => {
  let result = await getAllUser();
  res.json(result);
};

const sendOTP = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Enter email ' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  let params = {
    email: req.body.email,
    otp: otp,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
  };

  try {
    const result = await userServices.sendOtpServices(params);

    return res.status(200).json(result);
  } catch (e) {
    throw e;
  }
};

const verifyOTPlogin = async (req, res, next) => {
  if (!req.body.email || !req.body.otp) {
    res.status(400).json({ message: 'Enter email or password' });
  }

  let user = {
    email: req.body.email,
    otp: req.body.otp,
  };
  try {
    let result = await userServices.verifyOTPServices(user);
    res.status(200).json({ message: result });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({ message: 'Please Upload file !!' });
  }
  if (!req.body.email) {
    return res.status(404).json({ message: 'Please enter  email !!' });
  }

  let img = req.file;

  let data = {
    image: img,
    email: req.body.email,
  };

  let result = await uploadImageModels(data);

  try {
    console.log(result);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const getImagecontroller = async (req, res, next) => {
  let email = req.body.email;

  let result = await getImage(email);

  const imageBuffer = Buffer.from(result[0].image);

  let timestamp = new Date().getTime();
  let filename = `${email}-${timestamp}.jpg`;
  const filepath = `./utils/uploads/${filename}`;

  fs.writeFileSync(filename, imageBuffer);
};

const userController = {
  createUser,
  loginUser,
  getAllusercontroller,
  sendOTP,
  verifyOTPlogin,
  uploadImage,
  getImagecontroller,
};
module.exports = userController;
