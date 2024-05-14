const connection = require('../db');

const newPromiseDB = async (query, arr) => {
  return new Promise((resolve, reject) => {
    connection.query(query, arr, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
};

const createBlog = async (params) => {
  let query =
    'Insert into blog(title,description,status,userID) VALUES(?,?,?,?)';
  console.log(params);

  return newPromiseDB(query, [
    params.title,
    params.description,
    params.status,
    params.userID,
  ]);
};

const getAllBLog = async () => {
  const query = 'select * from blog';

  return newPromiseDB(query);
};

const likes = async (params) => {
  if (!params.userID || !params.blogID) {
    return 'Error in getting data ';
  }

  const query = 'Insert into likes(userID , blogID ) VALUES(?,?);';

  return await newPromiseDB(query, [params.userID, params.blogID]);
};

const comments = async (params) => {
  if (!params.userID || !params.blogID || !params.comments) {
    return 'Error in getting data ';
  }

  const query =
    'Insert into comments(userID , blogID ,comments ) VALUES(?,?,?);';

  return await newPromiseDB(query, [
    params.userID,
    params.blogID,
    params.comments,
  ]);
};

const getlike = async (params) => {
  const query = 'select * from likes where blogID = ? AND userID = ?';

  let result = await newPromiseDB(query, [params.blogID, params.userID]);

  return result;
};

const updateLike = async (params) => {
  const query = 'UPDATE likes SET status = ? WHERE blogID = ? AND userID = ?';

  return await newPromiseDB(query, [
    params.status,
    params.blogID,
    params.userID,
  ]);
};

const getAllLikes = async (params) => {
  const query = 'Select userID from likes where blogID=? AND status = 1 ';

  return await newPromiseDB(query, [params.blogID]);
};

const replies = async (params) => {
  if (!params.userID || !params.blogID || !params.reply || !params.commentID) {
    console.log('models');
    return 'Error in getting data ';
  }

  const query =
    'Insert into replies(userID , blogID ,reply, commentID  ) VALUES(?,?,?,?);';

  return await newPromiseDB(query, [
    params.userID,
    params.blogID,
    params.reply,
    params.commentID,
  ]);
};

const blogModels = {
  createBlog,
  likes,
  comments,
  getlike,
  updateLike,
  getAllLikes,
  getAllBLog,
  replies,
};

module.exports = blogModels;
