const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function validate(req, res, next) {
  const { authorization } = req.headers;


  if (!authorization) {
    return res.sendStatus(401);
  }

  const [, token] = authorization.split(' ');
console.log(token)
  try {
 const result3 = await promisify(jwt.verify)(token, 'ASDFVGHJKUYJRTHERGWEF');
    console.log(result3)
    const decoded = await jwt.decode(token);
   
    const userId = decoded.id;
   
    req.userId = userId;
  
    return next();
  } catch (err) {
    console.log("esta mandando esse erro)")
    
    return res.sendStatus(401);
  }
}

module.exports = validate;