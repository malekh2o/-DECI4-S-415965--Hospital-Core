import { useState, useEffect } from 'react';
import { getDoctors, addDoctor } from '../api';

function DoctorDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: '', specialty: '', phone: '' });

  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoctor(form);
    setForm({ name: '', specialty: '', phone: '' });
    fetchDoctors();
  };

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Specialty" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <button type="submit">Add Doctor</button>
      </form>

      <ul>
        {doctors.map((d) => (
          <li key={d._id}>Dr. {d.name} — {d.specialty}</li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;