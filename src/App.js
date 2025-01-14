import './App.css';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  CreatorDashboard  from './components/dashboard';
import BrandRegistrationForm from './components/BrandsAuth';
import BrandDashboard from './components/BrandsDashboard';
import LoginPage from './components/Agencies/LoginPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandRegistrationForm />} />
        <Route path="/brandsDashboard" element={<BrandDashboard />} />
        <Route path="/creatorsAuth" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<CreatorDashboard />} />
        <Route path="/agencyLogin" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
