const connection = require('../db');

// const newPromiseDB = async (query, arr) => {
//   return new Promise((resolve, reject) => {
//     connection.query(query, arr, (err, result) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         console.log(result);
//         resolve(result);
//       }
//     });
//   });
// };

const createBlog = async (params) => {
  try {
    const result = await connection('blog').insert({
      title: params.title,
      description: params.description,
      status: params.status,
      userID: params.userID,
    });

    console.log('Blog entry created:', result);

    return result;
  } catch (error) {
    console.error('Error creating blog entry:', error);
    throw error;
  }
};

const getAllBLog = async () => {
  try {
    let result = await connection('blog').select('*');
  } catch (error) {
    throw new error();
  }
};

const likes = async (params) => {
  if (!params.userID || !params.blogID) {
    return 'Error in getting data ';
  }

  try {
    let result = await connection('likes').insert({
      userID: params.userID,
      blogID: params.blogID,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const comments = async (params) => {
  if (!params.userID || !params.blogID || !params.comments) {
    return 'Error in getting data ';
  }

  try {
    let result = connection('comments').insert({
      userID: params.userID,
      blogID: params.blogID,
      comments: params.comments,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getlike = async (params) => {
  try {
    let result = await connection('likes').where({ blogID: params.blogID, userID: params.userID }).select('*');
    return result;
  } catch (error) {
    console.error('Error in getting data ', error);
    throw error;
  }
  //   const query = 'select * from likes where blogID = ? AND userID = ?';

  //   let result = await newPromiseDB(query, [params.blogID, params.userID]);

  //   return result;
};

const updateLike = async (params) => {
  try {
    let result = await connection('likes').where({ blogID: params.blogID, userID: params.userID }).update({ status: params.status });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
  //   const query = 'UPDATE likes SET status = ? WHERE blogID = ? AND userID = ?';

  //   return await newPromiseDB(query, [
  //     params.status,
  //     params.blogID,
  //     params.userID,
  //   ]);
};

const getAllLikes = async (blogID) => {
  try {
    let result = await connection('likes').select('userID').where({ blogID: blogID, status: 1 });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
  //   const query = 'Select userID from likes where blogID=? AND status = 1 ';

  //   return await newPromiseDB(query, [blogID]);
};

const replies = async (params) => {
  if (!params.userID || !params.blogID || !params.reply || !params.commentID) {
    return 'Error in getting data ';
  }

  try {
    let result = await connection('replies').insert({
      userID: params.userID,
      blogID: params.blogID,
      reply: params.reply,
      commentID: params.commentID,
    });
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
  //   const query =
  //     'Insert into replies(userID , blogID ,reply, commentID  ) VALUES(?,?,?,?);';

  //   return await newPromiseDB(query, [
  //     params.userID,
  //     params.blogID,
  //     params.reply,
  //     params.commentID,
  //   ]);
};

const getBlog = (blogID) => {
  try {
    let result = connection('blog').select('*').where('id', blogID);
    return result;
  } catch (err) {
    throw err;
  }
};

const getAllComments = async (blogID) => {
  const query = knex
    .select('c.*', 'r.*')
    .from('comments as c')
    .leftJoin('replies as r', function () {
      this.on('c.id', '=', 'r.commentID').andOn('c.blogID', '=', 'r.blogID');
    })
    .where('c.blogID', '=', blogID);

  return await query;
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
  getBlog,
  //     newPromiseDB,
  //   getAllcomments
};

module.exports = blogModels;
