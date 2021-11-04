const expressJWT = require('express-jwt');
const secret = process.env.JWT;

const auth = () =>{
    return expressJWT({
        secret,
        algorithms:['HS256'],
        
    })

}