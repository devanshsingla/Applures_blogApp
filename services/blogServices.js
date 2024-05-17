const blogModels = require('../models/blogModels');
const userModels = require('../models/userModels')

const createBlog = async (params) => {
  params['status'] = 1;
  try {
    let result = await blogModels.createBlog(params);
  } catch (err) {
    return err;
  }
};

const likes = async (params) => {
  if (!params.blogID || !params.userID) {
    return 'error in getting data ';
  }

  let likes = await blogModels.getlike(params);
  console.log(likes);
  if (likes.length == 0) {
    try {
      let result = await blogModels.likes(params);

      return 'Succesfully liked';
    } catch (e) {
      return e;
    }
  } else {
    if (likes[0].status == 1) {
      params['status'] = 0;
    } else {
      params['status'] = 1;
    }
    console.log(params);
    try {
      let result = await blogModels.updateLike(params);
      if (params.status == 0) {
        return 'Succefully disliked ';
      } else {
        return 'Succesfully liked ';
      }
    } catch (err) {
      return err;
    }
  }
};

const comment = async (params) => {
  console.log(params);
  if (!params.blogID || !params.userID || !params.comments) {
    return ' Error in getting input';
  }

  try {
    let result = await blogModels.comments(params);
    return 'Sucesfully commented ';
  } catch (e) {
    return e;
  }
};

const replies = async (params) => {
  if (!params.blogID || !params.userID || !params.reply || !params.commentID) {
    return ' Error in getting input';
  }

  try {
    let result = await blogModels.replies(params);
    console.log(result);
    return 'Sucesfully commented ';
  } catch (e) {
    return e;
  }
};

const getBLogData = async (blogID) => {
    
    if (!blogID) {
        return "Enter blogID"
    }
    
    let blog;
    try {
        blog = await blogModels.getBlog(blogID)
    } catch(err) {
        return err
    }
    if (blog.length == 0) {
        return "Blog doesnt exist"
    };
    blog = blog[0]
    
    let author;
    try {
        author = await userModels.getUserbyID(blog.userID)
    } catch (err) {
        return err;
    }
    
    blog['author'] = author[0];

    let likes;

     try {
        likes = await blogModels.getAllLikes(blogID)
    } catch (err) {
        return err;
     }
    
    for (let i = 0; i < likes.length; i++){
        try {
            let user = await userModels.getUserbyID(likes[i].userID)
            likes[i] = user[0]
        } catch (err) {
            return err
        }
    }
    blog['likes'] = likes;
    let comment;
    try {
        comment = await blogModels.getAllcomments(blogID)
    } catch (err) {
        return err;
    }

    blog['comments'] = comment



    return blog;


}

const blogServices = { createBlog, likes, comment, replies ,getBLogData };
module.exports = blogServices;
