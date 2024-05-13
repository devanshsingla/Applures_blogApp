const blogModels = require('../models/blogModels');


const createBlog = async (params) => {
    
    params['status'] = 1 
    try {
        let result = await blogModels.createBlog(params)
    } catch (err){
        return err
    }

}

const likes = async (params) => {
    
    if (!params.blogID || !params.userID ) {
        return 'error in getting data '
    }
    
    let likes = await blogModels.getlike(params);
    console.log(likes)
    if (likes.length == 0) {
        
        try {
            let result = await blogModels.likes(params)
            
            return 'Succesfully liked'
        }
        catch (e) {

            return e;
        }
        
    } else {
        if (likes[0].status == 1) {
            params['status'] = 0
        } else {
            params['status'] = 1
        }
        console.log(params)
        try {
            let result = await blogModels.updateLike(params)
            if (params.status == 0) {
                return "Succefully disliked "
            } else {
                return "Succesfully liked "
            }
        } catch (err) {
            return err
        }
    }
    
}



const blogServices = {createBlog,likes};
module.exports = blogServices;
