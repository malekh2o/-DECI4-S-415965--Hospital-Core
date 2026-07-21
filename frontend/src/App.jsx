import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PatientManagement from './components/PatientManagement';
import DoctorDashboard from './components/DoctorDashboard';
import AppointmentScheduling from './components/AppointmentScheduling';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Doctors</Link> | <Link to="/patients">Patients</Link> | <Link to="/appointments">Appointments</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DoctorDashboard />} />
        <Route path="/patients" element={<PatientManagement />} />
        <Route path="/appointments" element={<AppointmentScheduling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;