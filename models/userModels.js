const connection = require('../db');
const fs = require('fs');





    
    const createUser = async (params) => {
        const query = `INSERT INTO users (email, first_name, password, phone_number, last_name) VALUES (?, ?, ?, ?, ?)`;
        
       
        return new Promise((resolve, reject) => {
            connection.query(query, [params.email, params.firstName, params.password, params.number, params.lastName], (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    reject(err); 
                } else {
                    console.log('Data inserted:', results);
                    resolve(results); 
                }
            });
        });
    };

    const getUserByEmail = (email) => {
        return new Promise((resolve, reject) => {
            
            const query = 'SELECT * FROM users WHERE email = ?';
    
            
            connection.query(query, [email], (err, results) => {
                if (err) {
                    
                    reject(err);
                } else {
                   
                    resolve(results[0]);
                }
            });
        });
    };
    
const getAllUser = ()=>{

    return new Promise((resolve,reject) =>{

        const query = 'SELECT * FROM users ';

        connection.query(query , (err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })

    })
}

const OTPstore = (data)=>{
    const expiresAtDate = new Date(data.expires_at);
    // const formattedExpiresAt = expiresAtDate.toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO otp_users (email,otp,expires_at ) VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {
        connection.query(query, [data.email,data.otp,expiresAtDate], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                reject(err); 
            } else {
                console.log('Data inserted:', results);
                resolve(results); 
            }
        });
    });  
};

const verifyOTP = (email)=>{
 
    const query = 'SELECT * from otp_users where email = ?'

    return new Promise((resolve,reject)=>{

       connection.query(query,[email],(err,result)=>{

        if(err){
            console.log("error inserting data ",err)
            return reject(err);
        }else{
            console.log('data inserted:',result)
            return resolve(result[0])
        }

       })

    })


};

const CreateUserOTP = (data)=>{

   const query = 'INSERT INTO user_devices(email,device_type,device_token) VALUES (?,?,?) '

   return new Promise((resolve,reject)=>{

    connection.query(query,[data.email,data.device_type,data.device_token],(err,results)=>{

        if(err){
            console.log("Error in inserting data:",err)
            reject(err)
        }else{
            console.log("Succesfully inserted data:",results);
            resolve(results);
        }
    })
   })
};

const getUser = (email)=>{

    const query = ' select * from user_devices where email = ?';

    return new Promise((resolve,reject)=>{

        connection.query(query,[email],(err,results)=>{

            if(err){
                console.log("Failed to get data ",err);
                reject(err)
            }else{
                console.log("Succesfully retrieved data",results)
                resolve(results);
            }
        })
    })

}


const login_history = (params)=>{

    const query = 'INSERT into login_history(email,device_token,device_type) VALUES(?,?,?)'

    return new Promise((resolve,reject)=>{

        connection.query(query,[params.email,params.device_type,params.device_token],(err,results)=>{
    
            if(err){
                console.log("Error in inserting data:",err)
                reject(err)
            }else{
                console.log("Succesfully inserted data:",results);
                resolve(results);
            }
        })
       })



};


const updateUser = (params)=>{
  
    const currentDateTime = new Date();
    const currentDateTimeString = currentDateTime.toISOString().slice(0, 19).replace('T', ' ');

   params[login_history.login_time] = currentDateTimeString
   const query  = `
   UPDATE user_devices
   SET device_type = ?, device_token = ?,
   login_time = ?
   WHERE email = ?;
`;

return new Promise((resolve,reject)=>{

    connection.query(query,[params.device_type,params.device_token,params.login_time,params.email],(err,results)=>{

        if(err){
            console.log("Error in inserting data:",err)
            reject(err)
        }else{
            console.log("Succesfully inserted data:",results);
            resolve(results);
        }
    })
   })};

const uploadImageModels = async (data)=>{
    // console.log(data.image.originalname)
    // return
    console.log(data)
    const filedata = fs.readFileSync(data.image.path)

    const query = 'INSERT INTO IMAGE(email,image) VALUES(?,?)'

    return new Promise((resolve,reject)=>{

        connection.query(query,[data.email,filedata],(err,result)=>{

            if(err){
               console.log("failed to upload image",err)
               reject(err)
            }else{
               console.log('Succesfully uploaded image',result)
               resolve(result)
            }
        })
    })

}

const getImage = (email)=>{

    const query = 'Select image from image where email = ?'

    return new Promise((resolve,reject)=>{

        connection.query(query,[email],(err,result)=>{

            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(result)
                
            }
        })
    })
}
  
  
  







const userModels = {createUser,getUserByEmail,getAllUser,OTPstore,verifyOTP,CreateUserOTP,getUser,login_history,updateUser,uploadImageModels,getImage}
module.exports = userModels
