import './App.css';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  CreatorDashboard  from './components/dashboard';
import BrandRegistrationForm from './components/BrandsAuth';
import BrandDashboard from './components/BrandsDashboard';
import LoginPage from './components/Agencies/LoginPage';
import AgencyDashboard from './components/Agencies/AgencyDashboard';
import AgencyProfile from './components/Agencies/AgencyProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandRegistrationForm />} />
        <Route path="/brandsDashboard" element={<BrandDashboard />} />
        <Route path="/creatorsAuth" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<CreatorDashboard />} />
        <Route path="/agencyProfile" element={<AgencyProfile />} />
        <Route path="/agencyLogin" element={<LoginPage/>} />
        <Route path="/agencyDashboard" element={<AgencyDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
