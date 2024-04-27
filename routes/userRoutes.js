const express = require('express');
const userRoutes = express.Router();
const userController = require('../controller/userController')
const {upload} = require('../utils/utils')

userRoutes.post('/signup',userController.createUser);
userRoutes.post('/login',userController.loginUser);
userRoutes.post('/loginOTP',userController.loginOTPController);
userRoutes.post('/verifyOTP',userController.verifyOTPlogin);
userRoutes.get('/get',userController.getAllusercontroller);
userRoutes.post('/uploadimage',upload.single('file'),userController.uploadImage);
userRoutes.post('/getimage',userController.getImagecontroller)

module.exports =  userRoutes ;