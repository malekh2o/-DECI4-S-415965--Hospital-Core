const express = require('express');
const router = express.Router();
const { newAppointment, getAllAppointments, updateAppointment } = require('../controllers/appointmentController');

router.post('/', newAppointment);
router.get('/', getAllAppointments);
router.put('/:id', updateAppointment);

module.exports = router;