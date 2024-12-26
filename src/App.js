import './App.css';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  CreatorDashboard  from './components/dashboard';
import BrandRegistrationForm from './components/BrandsAuth';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrandRegistrationForm />} />
        <Route path="/creatorsAuth" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<CreatorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
