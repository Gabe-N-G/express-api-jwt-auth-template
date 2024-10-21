const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1] //takes away the string "header: "" from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //verify token
        req.user = decoded
        next();
    } catch (error) {
        res.status(401).json({error: 'Your money is no good here'})
    }
}

module.exports = verifyToken