
const userCache = {};

const putUserCache = (key, value) => {
    
    userCache[key] = value;
    return
};

const userLimitCache = new Map();

// const putUserLimit= (key, value) => {
    
//     userLimitCache[key] = value;
//     return
// };

const checkUserLimit = (email) => {
    
    if (userLimitCache.has(email)) {
        const userInfo = userLimitCache.get(email);
        if (userInfo.expiry < Date.now()) {
            userLimitCache.delete(email);
            userLimitCache.set(email, {
                count: 1,
                expiry: Date.now()+60000
            })
            return true;
        } else if (userInfo.count >= 3 && userInfo.expiry > Date.now()) {
            return false 
        } else if (userInfo.count < 3 && userInfo.expiry > Date.now()) {
            userLimitCache.delete(email)
            userLimitCache.set(email, {
                count: userInfo.count + 1,
                expiry : Date.now()+60000
            })
            return true 
        }
        
        
    } else {
        userLimitCache.set(email, {
            count: 1,
            expiry: Date.now()+ 60000
        })
        return true;
    }
}






module.exports = { putUserCache ,checkUserLimit,userCache}

