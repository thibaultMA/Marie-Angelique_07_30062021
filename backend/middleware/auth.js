const jwt=require('jsonwebtoken')

const jwtKey='THIS_SUPER_TOKEN?'

module.exports={
    generateToken:(userData)=>{
        return jwt.sign({
            userid:userData.id,
            niveau:userData.niveau,
        },
        jwtKey,
        {
            expiresIn:"1h"
        })
    },
    test:(req,res,next)=>{
        try {
            const token = req.headers["authorization"].split(' ')[1];
            const decodedToken = jwt.verify(token, jwtKey);
            const userId = decodedToken.userId;
            if (req.body.userId && req.body.userId !== userId) {
                throw 'Invalid user ID';
            } else {
                next();
            }
        } catch {
            res.status(401).json({
                error: new Error('Invalid request!')
            });
        }
    }
}