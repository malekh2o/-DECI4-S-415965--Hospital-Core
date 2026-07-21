const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');

const patientRoutes = require('../routes/patientRoutes');
const doctorRoutes = require('../routes/doctorRoutes');
const appointmentRoutes = require('../routes/appointmentRoutes');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/api/patients', patientRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/appointments', appointmentRoutes);
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('End-to-End Hospital Workflow', () => {
  test('Full flow: register patient -> register doctor -> book appointment -> verify in list', async () => {

    const patientRes = await request(app).post('/api/patients').send({
      name: 'E2E Patient',
      age: 30,
      gender: 'male',
      phone: '01055556666',
    });
    expect(patientRes.statusCode).toBe(201);
    const patientId = patientRes.body._id;


    const doctorRes = await request(app).post('/api/doctors').send({
      name: 'E2E Doctor',
      specialty: 'General',
      phone: '01077778888',
    });
    expect(doctorRes.statusCode).toBe(201);
    const doctorId = doctorRes.body._id;

    const appointmentRes = await request(app).post('/api/appointments').send({
      patient: patientId,
      doctor: doctorId,
      date: new Date(Date.now() + 86400000),
    });
    expect(appointmentRes.statusCode).toBe(201);

    const listRes = await request(app).get('/api/appointments');
    expect(listRes.statusCode).toBe(200);
    expect(listRes.body.length).toBe(1);
    expect(listRes.body[0].patient._id).toBe(patientId);
    expect(listRes.body[0].doctor._id).toBe(doctorId);
  });
});