const jwt = require('jsonwebtoken');
 './public.key'), 'utf8')

const privateKey = "ASDFVGHJKUYJRTHERGWEF";

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey,{
        expiresIn: '1d',
        algorithm: 'HS256',
    })
}

module.exports = {generateToken};