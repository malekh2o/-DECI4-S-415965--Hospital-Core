import { useState, useEffect } from 'react';
import { getPatients, createPatient } from '../api';

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', gender: 'male', phone: '' });

  const fetchPatients = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPatient(form);
    setForm({ name: '', age: '', gender: 'male', phone: '' });
    fetchPatients();
  };

  return (
    <div>
      <h2>Patient Management</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
        <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          placeholder="Phone (11 digits)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 11) })}
          pattern="\d{11}"
          maxLength={11}
          required
        />
        <button type="submit">Add Patient</button>
      </form>

      <ul>
        {patients.map((p) => (
          <li key={p._id}>{p.name} — {p.age} yrs — {p.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientManagement;