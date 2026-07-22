const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{11}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number (must be 11 digits)`,
        },
    },
     medicalHistory: {
        type: String,
        default: '',
    },
},
{ timestamps: true });

module.exports = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

