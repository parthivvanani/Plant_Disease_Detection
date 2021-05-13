/*jshint esversion: 8*/
const request = require('supertest');
const app = require('../../expressApp');
const {userOneId, userOne, setupDB, clearDB} = require('./db');


beforeEach(async () => {
    await setupDB();
});

// afterAll(async () => {
//     clearDB();
// });

test('Login with valid username and password', async () => {
    await request(app)
        .post('/api/auth/signin')
        .send({
            "username": userOne.username,
            "password": userOne.password
        })
        .expect(200);
});

test('Should not login non existing user', async () => {
    await request(app)
        .post('/api/auth/signin')
        .send({
            "username": 'rsr1',
            "password": userOne.password
        })
        .expect(404);
});

test('Should be able to access general content', async () => {
    await request(app)
        .get('/api/test/all')
        .send()
        .expect(200);
});

test('Should be able to access user content', async () => {
    await request(app)
        .get('/api/test/user')
        .set('x-access-token', userOne.tokens[0].token)
        .send()
        .expect(200);
});