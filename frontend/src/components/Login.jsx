import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { Link } from 'react-router-dom';

const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
  
      const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Send login request to the server
            const res = await axios.post("/api/v1/users/login", { email, password });
    
            if (res.status === 200) {
                alert("Login successful!");
                localStorage.setItem("token", res.data.data.user.accessToken);
                navigate("/dashboard");
            }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                if (status === 401) alert("Invalid credentials. Please try again.");
                else if (status === 404) alert("User not found. Please register.");
                else if (status === 400) alert("Bad Request. Please check the provided data.");
                else if (status === 500) alert("Server error. Please try again later.");
                else alert("Unexpected error: " + (err.response.data?.message || "Unknown error"));
            } else {
                alert("Login failed: " + err.message);
            }
    
            console.error("Login Error Details:", err.response?.data || err.message);
        }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign in to your account</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm text-gray-700 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;