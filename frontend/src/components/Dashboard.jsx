import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Dashboard</h2>
                <p className="text-center text-gray-500 mb-6">Select an action below:</p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate("/upload")}
                        className="w-full py-3 px-6 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Upload Image
                    </button>
                    <button
                        onClick={() => navigate("/history")}
                        className="w-full py-3 px-6 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        View History
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
