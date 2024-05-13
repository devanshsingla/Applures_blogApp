const blogServices = require('../services/blogServices');
const { upload } = require('../utils/utils');
const blogModels = require('../models/blogModels');


const createBlog = async (req, res) => {
    
    if (!req.body.title || !req.body.desc) {
        return res.status(400).json({ message: "Enter title and description for the blog" })
    };
    
    
    if (req.body.image) {
        try {
            let result = await upload(req.body.image)
            console.log(result)
        } catch (err) {
            return console.log(err)
        }
    }


    let newBlog = {
        title: req.body.title,
        description: req.body.desc,
        userID: req.user.userID
    }
    try {
        let result = await blogServices.createBlog(newBlog)
        res.status(200).json({ message: "Blog Created Successfully" })
    } catch (err) {
        res.status(200).json(err)
        console.log(err)
    }
};

const likes = async (req,res,next) => {
    
    if (!req.body.blogID) {
        return res.status(400).json({message:"Enter BLogID"})
    }


    let likeparams = {
        blogID: parseInt(req.body.blogID),
        userID : req.user.userID
    }
    try {
        let result = await blogServices.likes(likeparams);
        res.status(200).json({message:result})
    } catch (err) {
        console.log(err)
        res.status(400).json({message:err})
    }

}

const getLikes = async (req, res, next) => {
    
    if (!req.body.blogID) {
        return res.status(400).json({ message: "enter blogID" })
    }

    try {
        
        let result = await blogModels.getAllLikes(req.body)
        if (result.length == 0) {
            res.status(200).json({ message: "No likes" })
        } else {
            res.status(200).json({ likes: result, count: result.length })
        }
    } catch (err) {
        res.status(200).json({ message: err })
    }

};

const getAllBLog = async (req, res, next) => {
    
    try {
        let result = await blogModels.getAllBLog()
        return res.status(200).json({result})
        
    } catch(e) {
        return res.status(400).json({ message:e})
    }
}








const blogController = {createBlog,likes,getLikes,getAllBLog};
module.exports = blogController;