process.env.NODE_ENV = 'local_test';

//routes.test.js
const request = require('supertest');
const server = require('../server.js');
const signToken = require('../routes/utils').signToken;
const verifyToken = require('../routes/utils').verifyToken;
const knex = require('../db/connections.js');

beforeEach(async () => {
 // do something before each run
	return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
});

// close the server after each test
afterAll(() => {
	server.close();
	console.log('server closed!');
	return knex.migrate.rollback();
});

describe('GET users tests', () => {
	
	test('failing GET /users', async () => {
		await request(server).post('/users')
		.then(response => {
			console.log(response.body)
			expect(response.body.status).toBeFalsy();
			expect(response.body.message).toEqual("Validation Error")
		})
 	});

 	test('success GET /users', async () => {
 		const token = signToken({name: 'User'})
 		const config = {'header': {'Authorization': 'Token' ,'x-access-token': token}}
		request(server)
			.post('/users')
			.set(config)
			.end(function(err, response){
				console.log(err)
        		console.log(response.body)
				expect(response.body.status).toBeTruthy();
				expect(response.body.message).toEqual("You are logged")
      			});		
 	});
});
