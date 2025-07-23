import React, { useState } from "react";
import { Building2, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";
import AgencyAuth from "../../services/agencies/AgencyAuth";
import { useNavigate } from "react-router-dom";
import logoForLogin from "../../assets/logo/logoForLogin.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agencyName: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await AgencyAuth.login({
        email: formData.email,
        password: formData.password,
      });

      // Store the token and agency ID
      localStorage.setItem("agencyId", response.id);

      // Redirect to dashboard or home page
      navigate("/agencyDashboard");
    } catch (error) {
      setError(error.error || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white items-center justify-center">
      <div>
        <img
          src={logoForLogin}
          alt="logoForLogin"
          className="w-40 m-6 filter drop-shadow-sm"
        />
      </div>
      <div className="md:w-2/5 mx-auto p-6 sm:p-8 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#00C957]">
            Agency Login
          </h1>
          <p className="text-gray-700 mt-2">Manage your influencer campaigns</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="agencyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Agency Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="agencyName"
                name="agencyName"
                placeholder="Enter your agency name"
                className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400 "
                value={formData.agencyName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3    border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400 transition-all disabled:opacity-50"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3    border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 placeholder-gray-400 transition-all disabled:opacity-50"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 text-red-500 rounded-lg">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#007AFF] to-[#00C957] text-white py-3 px-4 rounded-lg hover:from-blue-500 hover:to-green-500 focus:ring-4 focus:ring-blue-500/30 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:text-blue-900 hover:underline font-medium transition-colors"
            >
              Sign up
            </a>
          </p>
          <p className="text-sm text-gray-400">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-900 hover:underline font-medium transition-colors"
            >
              Forgot password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
