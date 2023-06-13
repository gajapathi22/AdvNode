// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey =process.env.JWT_SECRETKEY;


function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log('1111')
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      console.log('decoded.id:', decoded.user_name);
      req.user = {
        user_name: decoded.user_name
      };
    
     
      next();
    });
    // res.send(secretKey)
  }

  module.exports = {authenticateToken,secretKey};