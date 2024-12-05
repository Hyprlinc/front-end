import './App.css';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  CreatorDashboard  from './components/dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<CreatorDashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
