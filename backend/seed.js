const mongoose = require('mongoose');
require('dotenv').config();

const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const patients = [
  { name: 'Ahmed Mohamed', age: 35, gender: 'male', phone: '01012345678', medicalHistory: 'Diabetes' },
  { name: 'Sara Ali', age: 28, gender: 'female', phone: '01123456789', medicalHistory: 'Asthma' },
  { name: 'Mostafa Hassan', age: 42, gender: 'male', phone: '01234567890', medicalHistory: 'Hypertension' },
];

const doctors = [
  { name: 'Youssef Ibrahim', specialty: 'Cardiology', phone: '01098765432' },
  { name: 'Nour El-Din', specialty: 'Pediatrics', phone: '01187654321' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Patient.deleteMany();
    await Doctor.deleteMany();
    await Appointment.deleteMany();
    console.log('Old data cleared');

    const createdPatients = await Patient.insertMany(patients);
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`${createdPatients.length} patients created`);
    console.log(`${createdDoctors.length} doctors created`);

    const appointments = [
      {
        patient: createdPatients[0]._id,
        doctor: createdDoctors[0]._id,
        date: new Date(Date.now() + 86400000),
        status: 'scheduled',
      },
      {
        patient: createdPatients[1]._id,
        doctor: createdDoctors[1]._id,
        date: new Date(Date.now() + 172800000),
        status: 'scheduled',
      },
    ];

    const createdAppointments = await Appointment.insertMany(appointments);
    console.log(`${createdAppointments.length} appointments created`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();