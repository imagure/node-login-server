const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

function encryptPwd(password) {
	return bcrypt.hashSync(password, salt)
}

function validateUser(password, hash) {
	return bcrypt.compareSync(password, hash[0].password)
}

module.exports = {
	encryptPwd: encryptPwd,
	validateUser: validateUser
}