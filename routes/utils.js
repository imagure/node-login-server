const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const signOptions = {
 issuer:  'FDTE',
 subject:  'user@fdte.io',
 audience:  'fdte.io',
 expiresIn:  "5s",
 algorithm:  "HS256"
};

function encryptPwd(password) {
	return bcrypt.hashSync(password, salt)
}

function validateUser(password, hash) {
	return bcrypt.compareSync(password, hash[0].password)
}

function verifyToken(header) {
  try {
    console.log('verifyToken')
    const token = header.token
    console.log(token)
    if (!token) {
      return false
    }
    jwt.verify(token, privateKEY, function(err, decoded) {
      if (err) {
        return false
      } else {
        console.log('Token verification succeded!')
        return true;
      }
    })
  } catch(err) {
    console.log(err)
    return false
  }
}

function signToken(payload) {
	return jwt.sign(payload, privateKEY, signOptions);
}

module.exports = {
	encryptPwd: encryptPwd,
	validateUser: validateUser,
	signToken: signToken,
	verifyToken: verifyToken
}