import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const APPOINTMENT_API_URL = 'http://localhost:5001/api';

export const getPatients = () => axios.get(`${API_URL}/patients`);
export const createPatient = (data) => axios.post(`${API_URL}/patients`, data);

export const getDoctors = () => axios.get(`${API_URL}/doctors`);
export const addDoctor = (data) => axios.post(`${API_URL}/doctors`, data);

export const getAppointments = () => axios.get(`${APPOINTMENT_API_URL}/appointments`);
export const newAppointment = (data) => axios.post(`${APPOINTMENT_API_URL}/appointments`, data);