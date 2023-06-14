const jwt = require('jsonwebtoken');
const pool = require('./models/database');

function authToken(req, res, next){
    const auth_header = req.headers.authorization;
    let token = auth_header && auth_header.split(' ')[1];
    if(token == null) return res.status(401).json({message : "User not logged in"})
    
    pool.query(
        `SELECT * FROM blacklist WHERE tokens = ?`,
        [token],
        (err, result) => {
            if(err) {
                return res.status(500).json({
                    error : "Internal Server Error"
                })
            }
            if(result.length == 0){
                jwt.verify(token , process.env._TOKEN_SECRET, (err, user) =>{
                    if(err) return res.status(403).json({message : "Forbidden : Access Denied"});
                    req.user = {...user};
                    return next();
                })
            }else
            return res.status(401).json({message : "User not logged in"})
        }
    )
}

module.exports = authToken;