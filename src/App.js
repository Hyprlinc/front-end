import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatorDashboard from "./components/dashboard";
import BrandRegistrationForm from "./components/BrandsAuth";
import BrandDashboard from "./components/BrandsDashboard";
import LoginPage from "./components/Agencies/LoginPage";
import AgencyDashboard from "./components/Agencies/AgencyDashboard";
import AgencyProfile from "./components/Agencies/AgencyProfile";
import BrandsDashboard2 from "./components/Brand/Dashboard";
import { MessageProvider } from "./components/Brand/Context/MessagesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../src/components/lib/toast";

function App() {
  return (
    <MessageProvider>
      <Router>
        <ToastContainer {...toastConfig} />
        <Routes>
          <Route path="/" element={<BrandRegistrationForm />} />
          <Route path="/brandsDashboard" element={<BrandsDashboard2 />} />
          <Route path="/creatorsAuth" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<CreatorDashboard />} />
          <Route path="/agencyProfile" element={<AgencyProfile />} />
          <Route path="/agencyLogin" element={<LoginPage />} />
          <Route path="/agencyDashboard" element={<AgencyDashboard />} />
        </Routes>
      </Router>
    </MessageProvider>
  );
}

export default App;
