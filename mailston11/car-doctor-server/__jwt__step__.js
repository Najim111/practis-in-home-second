/**
 * install jsonwebtoken
 * jwt.sign(payload/data bole ,secret,{expiresIn:1h})
 * token client
 */

/**
 * how to store token in the client side
 * 1. memory---->ok type 
 * 2. local storage----> ok type(xss)
 * 3. cookies--> http type 
 */

/**
 * set cookies with http only, for development  secure:false
 * 
 * cors 
 * app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true,
}));
 * 
 * client site axios setting
 * 
 * in axios set withCredentials:true
 */