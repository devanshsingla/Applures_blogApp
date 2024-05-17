const connection = require('../db');
const fs = require('fs');
const blogModels = require('./blogModels');

const createUser = async (params) => {
  try {
    const result = await connection('users').insert({
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
    });

    console.log('Data inserted:', result);

    return result;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await connection('users').where('email', email).first();
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllUser = async () => {
  try {
    const results = await connection('users').select('*');
    return results;
  } catch (error) {
    throw error;
  }
};

// const OTPstore = (data) => {
//   const expiresAtDate = new Date(data.expires_at);

//   const query =
//     'INSERT INTO otp_users (email,otp,expires_at ) VALUES (?, ?, ?)';

//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       [data.email, data.otp, expiresAtDate],
//       (err, results) => {
//         if (err) {
//           console.error('Error inserting data:', err);
//           reject(err);
//         } else {
//           console.log('Data inserted:', results);
//           resolve(results);
//         }
//       },
//     );
//   });
// };

// const verifyOTP = (email) => {
//   const query = 'SELECT * from otp_users where email = ?';

//   return new Promise((resolve, reject) => {
//     connection.query(query, [email], (err, result) => {
//       if (err) {
//         console.log('error inserting data ', err);
//         return reject(err);
//       } else {
//         console.log('data inserted:', result);
//         return resolve(result[0]);
//       }
//     });
//   });
// };

// const CreateUserOTP = (data) => {
//   const query =
//     'INSERT INTO user_devices(email,device_type,device_token) VALUES (?,?,?) ';

//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       [data.email, data.device_type, data.device_token],
//       (err, results) => {
//         if (err) {
//           console.log('Error in inserting data:', err);
//           reject(err);
//         } else {
//           console.log('Succesfully inserted data:', results);
//           resolve(results);
//         }
//       },
//     );
//   });
// };

// const getUser = (email) => {
//   const query = ' select * from user_devices where email = ?';

//   return new Promise((resolve, reject) => {
//     connection.query(query, [email], (err, results) => {
//       if (err) {
//         console.log('Failed to get data ', err);
//         reject(err);
//       } else {
//         console.log('Succesfully retrieved data', results);
//         resolve(results);
//       }
//     });
//   });
// };

// const login_history = (params) => {
//   const query =
//     'INSERT into login_history(email,device_token,device_type) VALUES(?,?,?)';

//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       [params.email, params.device_type, params.device_token],
//       (err, results) => {
//         if (err) {
//           console.log('Error in inserting data:', err);
//           reject(err);
//         } else {
//           console.log('Succesfully inserted data:', results);
//           resolve(results);
//         }
//       },
//     );
//   });
// };

// const updateUser = (params) => {
//   const currentDateTime = new Date();
//   const currentDateTimeString = currentDateTime
//     .toISOString()
//     .slice(0, 19)
//     .replace('T', ' ');

//   params[login_history.login_time] = currentDateTimeString;
//   const query = `
//    UPDATE user_devices
//    SET device_type = ?, device_token = ?,
//    login_time = ?
//    WHERE email = ?;
// `;

//   return new Promise((resolve, reject) => {
//     connection.query(
//       query,
//       [
//         params.device_type,
//         params.device_token,
//         params.login_time,
//         params.email,
//       ],
//       (err, results) => {
//         if (err) {
//           console.log('Error in inserting data:', err);
//           reject(err);
//         } else {
//           console.log('Succesfully inserted data:', results);
//           resolve(results);
//         }
//       },
//     );
//   });
// };

// const uploadImageModels = async (data) => {

//   const filedata = fs.readFileSync(data.image.path);

//   const query = 'INSERT INTO IMAGE(email,image) VALUES(?,?)';

//   return new Promise((resolve, reject) => {
//     connection.query(query, [data.email, filedata], (err, result) => {
//       if (err) {
//         console.log('failed to upload image', err);
//         reject(err);
//       } else {
//         console.log('Succesfully uploaded image', result);
//         resolve(result);
//       }
//     });
//   });
// };

// const getImage = (email) => {
//   const query = 'Select image from image where email = ?';

//   return new Promise((resolve, reject) => {
//     connection.query(query, [email], (err, result) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

const getUserbyID = async (userID) => {
  try {
    let result = connection(users).select('*').where('id', userID);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const userModels = {
  createUser,
  getUserByEmail,
  getAllUser,
  // OTPstore,
  // verifyOTP,
  // CreateUserOTP,
  // getUser,
  // login_history,
  // updateUser,
  // uploadImageModels,
  // getImage,
  getUserbyID,
};
module.exports = userModels;
