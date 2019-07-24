
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() => {
    return knex('users').insert({
      name: 'Gabi',
      password: '123'
    });
  })
  .then(() => {
    return knex('users').insert({
      name: 'Ricardo',
      password: '123'
    });
  })
};
