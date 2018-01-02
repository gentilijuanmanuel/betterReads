const jwt = require('jsonwebtoken');

/*
* On the request, the token must be passed as a header
* key: Authorization
* value: Bearer 'the_valid_token' 
* example: Bearer exaxcjlisaajae
*/

module.exports = (req, res, next) => {
    try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, "asupersecretprivatekey:)");
        req.userData = decoded;
        next();
    }
    catch(err) {
        return res.status(401).json({
            message: 'Authentication failed.'
        });
    }
    
};