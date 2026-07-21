const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true},
    specialty: { type: String, required: true},
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
}, { timestamps: true});

module.exports = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

