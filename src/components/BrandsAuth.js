import { useState } from "react";
import { Building2, Lock, Mail, MailIcon, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { brandLogin, registerBrand } from "../services/brands/BrandsServices";
import { Button } from "./ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showToast } from "./lib/toast";
import logoForLogin from "../assets/logo/logoForLogin.png";

const BrandRegistrationForm = () => {
  const [formData, setFormData] = useState({
    brandsName: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.brandsName.trim()) {
      newErrors.brandsName = "Brand name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid work email";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const registrationData = {
        brandsName: formData.brandsName,
        email: formData.email,
        country: formData.country,
        password: formData.password,
      };

      const response = await registerBrand(registrationData);
      setSubmitStatus("success");
      setFormData({
        brandsName: "",
        email: "",
        country: "",
        password: "",
        confirmPassword: "",
      });
      // After successful registration, switch to login form
      setShowLoginForm(true);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
  };

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Other",
  ];

  if (showLoginForm) {
    return <BrandLoginForm setShowLoginForm={setShowLoginForm} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center">
      <div>
        <img
          src={logoForLogin}
          alt="logoForLogin"
          className="w-40 m-6 filter drop-shadow-sm"
        />
      </div>
      <div className="md:w-2/5 mx-auto p-6 sm:p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#00C957] mb-2">
              Register Your Brand
            </h1>
            <p className="text-gray-900 text-sm sm:text-base">
              Join our platform and connect with influencers
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="brandsName"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Brand Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="brandsName"
                  name="brandsName"
                  type="text"
                  placeholder="Enter your brand name"
                  autoComplete="off"
                  required
                  value={formData.brandsName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all autofill:  autofill:text-white"
                />
              </div>
              {errors.brandsName && (
                <p className="mt-1 text-sm text-red-600">{errors.brandsName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Enter your work email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Country
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Map className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="country"
                  name="country"
                  required
                  autoComplete="off"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full pl-10 pr-6 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all"
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="pr-4">
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-2"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  required
                  autoComplete="off"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-11 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="default"
              size="full"
              disabled={isSubmitting}
              className="py-3 text-lg text-white font-semibold bg-gradient-to-r from-[#007AFF] to-[#00C957] hover:from-blue-600 hover:to-green-500 transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? "Registering..." : "Register Brand"}
            </Button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-4 text-gray-800 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            <p className="text-center text-gray-700 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setShowLoginForm(true)}
                className="font-medium text-blue-500 hover:text-blue-900 hover:underline focus:outline-none transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const BrandLoginForm = ({ setShowLoginForm }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem("brandToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("brandToken");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const loginResponse = await brandLogin(formData.email, formData.password);
      storeToken(loginResponse.data.token);
      console.log("Login response:", loginResponse);
      navigate("/brandsDashboard");
      // Replace with navigation to dashboard
    } catch (error) {
      console.error("Login error:", error);
      showToast.error("Invalid credentials. Please try again.");
      setErrors({ submit: "Invalid credentials. Please try again." });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white flex flex-col justify-center ">
      <div>
        <img
          src={logoForLogin}
          alt="logoForLogin"
          className="w-40 m-6 filter drop-shadow-sm"
        />
      </div>
      <div className=" md:w-2/5 mx-auto p-6 sm:p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#00C957] mb-2">
              Login to Your Brand Account
            </h1>
            <p className="text-gray-900 text-sm sm:text-base">
              Welcome back! Please enter your details
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Enter your work email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-2"
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
                  autoComplete="off"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3   border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {errors.submit && (
              <p className="mt-1 text-sm text-red-600">{errors.submit}</p>
            )}

            <Button
              type="submit"
              variant="default"
              size="full"
              disabled={isSubmitting}
              className="py-3 text-lg text-white font-semibold bg-gradient-to-r from-[#007AFF] to-[#00C957] hover:from-blue-600 hover:to-green-500 transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-4 text-gray-800 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            <p className="text-center text-gray-700 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="font-medium text-blue-500 hover:text-blue-900 hover:underline focus:outline-none transition-colors"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandRegistrationForm;
