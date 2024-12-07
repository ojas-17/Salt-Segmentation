import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <Navbar />

            {/* Welcome Section */}
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-6 text-center">
                <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                    Welcome to Salt Prediction
                </h1>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                    Discover the power of AI in salt prediction using seismic images. Log in or Sign up to get started.
                </p>
                
                <div className="space-x-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="py-3 px-8 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="py-3 px-8 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Cards Section */}
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
                        Learn More About Salt Decomposition
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-indigo-600 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14 5l7 7-7 7M5 12h13"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Salt Decomposition Process</h3>
                            <p className="text-gray-700">
                                Our AI model predicts salt content in seismic images using advanced image
                                processing techniques. This helps in determining salt layers beneath the Earth's
                                surface.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-purple-600 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12h6M12 9v6"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Impact on Exploration</h3>
                            <p className="text-gray-700">
                                Understanding salt decomposition is vital for oil and gas exploration, as salt
                                formations can affect seismic imaging and resource extraction.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-indigo-600 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 3v18l15-9-15-9z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">AI in Seismic Imaging</h3>
                            <p className="text-gray-700">
                                Our AI algorithms analyze seismic data to predict salt content, providing
                                valuable insights for geologists and engineers working in the field of resource
                                extraction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
