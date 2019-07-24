const knex = require('../connections');

function getAllUsers() {
  return knex('users')
  .select('*');
}

function insertNewUser(name, hash) {
  try{
    const insert = knex('users')
                  .insert({name: name, password: hash});
    return insert
  } catch(e) {
    return e
  }
}

function getUserPwd(name) {
  return knex('users')
  .select('password')
  .where('name', name);
}

module.exports = {
  getAllUsers: getAllUsers,
  getUserPwd: getUserPwd,
  insertNewUser: insertNewUser
};
