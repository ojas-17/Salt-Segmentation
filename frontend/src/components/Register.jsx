import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import "../index.css";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const countryRef = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();  // Prevent the form from submitting the traditional way
        
        // Extract the values from the refs
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const country = countryRef.current.value;

        try {
            // Send the form data to the server
            const res = await axios.post("/api/v1/users/register", {
                fullname: `${firstName} ${lastName}`,
                email,
                username: email,
                password,
                country,
            });
        
            if (res.status === 201) {
                alert("Registration successful");
                navigate("/login");
            }
        } catch (err) {
            // Handle errors based on the response status
            if (err.response) {
                const status = err.response.status;
                if (status === 409) {
                    alert("User with this email already exists");
                    navigate("/login");
                }
                else if (status === 400) alert("All fields are required");
                else if (status === 500) alert("Failed to create user");
                else alert("Unexpected error: " + err.response.data?.message || "Unknown error");
            } else {
                alert("Registration failed: " + err.message);
            }
        }
        
    };

    return (
        <>
            <div className="my-4 flex justify-center items-center min-h-screen px-4">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800"></h2>

                    <button className="w-full flex items-center justify-center bg-blue-500 text-white font-medium rounded-full px-4 py-2 mb-4">
                        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <img
                                width="50"
                                height="50"
                                src="https://img.icons8.com/color/50/google-logo.png"
                                alt="google-logo"
                            />
                        </div>
                        Continue with Google
                    </button>

                    <div className="flex items-center justify-center mb-4 relative">
                        <span className="text-gray-500 relative px-4 before:content-[''] before:absolute before:left-10 before:w-16 md:before:w-44 before:h-px before:bg-gray-300 before:top-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:right-10 after:w-16 md:after:w-44 after:h-px after:bg-gray-300 after:top-1/2 after:-translate-y-1/2">
                            or
                        </span>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="firstName"
                            >
                                First name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First name"
                                ref={firstNameRef}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="lastName"
                            >
                                Last name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last name"
                                ref={lastNameRef}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                ref={emailRef}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password (8 or more characters)"
                                ref={passwordRef}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-10 mt-2 focus:outline-none"
                            ></button>
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="country"
                            >
                                Country
                            </label>
                            <select
                                id="country"
                                name="country"
                                ref={countryRef}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            >
                                <option>India</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Australia</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-blue-600"
                                    required
                                />
                                <span className="ml-2 text-gray-700">
                                    Yes, I understand and agree to the
                                    <a
                                        href="#"
                                        className="text-blue-600 underline"
                                    >
                                        Terms of Service
                                    </a>
                                    , including the
                                    <a
                                        href="#"
                                        className="text-blue-600 underline"
                                    >
                                        User Agreement
                                    </a>
                                    and
                                    <a
                                        href="#"
                                        className="text-blue-600 underline"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                        >
                            Register Now
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p>
                            {/* {linkText} */}
                            {/* <a href={linkHref} className="text-blue-600 hover:underline">
                                log in
                            </a> */}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
