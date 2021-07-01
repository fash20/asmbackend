const jwt = require('jsonwebtoken')

const verifyToken = (req, res, netx) =>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT,(err, user)=>{
            if(err){
                return res.status(403).json({message:"User verification failed"});
            }
            req.user;
            netx()
        });

    }
    else{
        res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = verifyToken;