const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');

const patientRoutes = require('../routes/patientRoutes');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/api/patients', patientRoutes);
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Patient API', () => {
  test('POST /api/patients should create a new patient', async () => {
    const res = await request(app).post('/api/patients').send({
      name: 'Test Patient',
      age: 30,
      gender: 'male',
      phone: '01011112222',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Patient');
  });

  test('POST /api/patients should reject invalid phone number', async () => {
    const res = await request(app).post('/api/patients').send({
      name: 'Bad Phone',
      age: 25,
      gender: 'female',
      phone: '123',
    });

    expect(res.statusCode).toBe(400);
  });

  test('GET /api/patients should return list of patients', async () => {
    await request(app).post('/api/patients').send({
      name: 'Another Patient',
      age: 40,
      gender: 'male',
      phone: '01022223333',
    });

    const res = await request(app).get('/api/patients');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});