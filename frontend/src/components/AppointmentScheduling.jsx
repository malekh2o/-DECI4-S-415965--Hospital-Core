import { useState, useEffect } from 'react';
import { getAppointments, newAppointment, getPatients, getDoctors } from '../api';

function AppointmentScheduling() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ patient: '', doctor: '', date: '' });

  const fetchAll = async () => {
    const [aRes, pRes, dRes] = await Promise.all([getAppointments(), getPatients(), getDoctors()]);
    setAppointments(aRes.data);
    setPatients(pRes.data);
    setDoctors(dRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newAppointment(form);
    setForm({ patient: '', doctor: '', date: '' });
    fetchAll();
  };

  return (
    <div>
      <h2>Appointment Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} required>
          <option value="">Select Patient</option>
          {patients.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} required>
          <option value="">Select Doctor</option>
          {doctors.map((d) => <option key={d._id} value={d._id}>Dr. {d.name}</option>)}
        </select>
        <input
          type="datetime-local"
          value={form.date}
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>{a.patient?.name} with Dr. {a.doctor?.name} — {new Date(a.date).toLocaleString()} — {a.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentScheduling;