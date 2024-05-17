require('dotenv').config();
const multer = require('multer');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { readFileSync } = require('fs');

const path = require('path');

global.__basedir = path.resolve(__dirname);

const emailTemplatePath = 'utils/temp.html';

const emailTemplate = readFileSync(emailTemplatePath, 'utf8');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const saltRounds = 10;

const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
  debug: true,
});

async function sendEmail(toEmail, otp) {
  const formattedTemplate = emailTemplate.replace('{{otp}}', otp);
  const mailOptions = {
    from: 'devanshsingladev8448@gmail.com',
    to: toEmail,
    subject: 'OTP for email verification',
    text: `Your OTP is ${otp}`,
    html: formattedTemplate,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${toEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-pic-${file.originalname}`);
  },
});

const upload = multer({ storage: storage, fileFilter: imageFilter });

module.exports = {
  validateEmail,
  comparePassword,
  hashPassword,
  sendEmail,
  upload,
};
