const Doctor = require('../models/Doctor');

const addDoctor = async (req, res) => {
    try{
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json(doctor);
    }catch (error){
        res.status(400).json({error: error.message})
    }
};

const getAllDoctors = async (req, res) => {
    try{
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    }catch (error){
        res.status(500).json({error: error.message});
    }
};

module.exports = {addDoctor, getAllDoctors};