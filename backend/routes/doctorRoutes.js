const express = require('express');
const router = express.Router();
const { addDoctor, getAllDoctors } = require('../controllers/doctorController');

router.post('/', addDoctor);
router.get('/', getAllDoctors);

module.exports = router;