const Appointment = require('../models/Appointment');
require('../models/Patient');
require('../models/Doctor');

const newAppointment = async (req, res) => {
    try{
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    }catch (error){
        res.status(400).json({error: error.message});
    }
};

const getAllAppointments = async (req, res) => {
    try{
        const appointments = await Appointment.find().populate('patient').populate('doctor');
        res.status(200).json(appointments);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { newAppointment, getAllAppointments, updateAppointment };