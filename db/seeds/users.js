const encryptPwd = require('../../routes/utils').encryptPwd;

const hash = encryptPwd('123')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() => {
    return knex('users').insert({
      name: 'Gabi',
      password: hash
    });
  })
  .then(() => {
    return knex('users').insert({
      name: 'Ricardo',
      password: hash
    });
  })
};
