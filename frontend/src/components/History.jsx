import React, { useState } from "react";
import axios from "../services/api";

function History() {
    const [location, setLocation] = useState("");
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        if (!location) {
            setError("Please enter a location.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const res = await axios.get(`/history/${location}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setHistory(res.data);
        } catch (err) {
            setError("Failed to fetch history: " + err.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">View History</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex justify-center mb-6">
                    <button
                        onClick={fetchHistory}
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                        }`}
                    >
                        {loading ? "Loading..." : "Fetch History"}
                    </button>
                </div>

                <div>
                    {history.length > 0 ? (
                        <ul className="space-y-4">
                            {history.map((item) => (
                                <li key={item._id} className="bg-gray-50 p-4 rounded-md shadow-md">
                                    <p className="text-gray-600">Uploaded at: {new Date(item.timestamp).toLocaleString()}</p>
                                    <div className="flex justify-between mt-4">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={`http://localhost:5000${item.imagePath}`}
                                                alt="Uploaded"
                                                className="max-w-[200px] h-auto rounded-md shadow-md mb-2"
                                            />
                                            <span className="text-sm text-gray-500">Original</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={`http://localhost:5000${item.maskPath}`}
                                                alt="Predicted Mask"
                                                className="max-w-[200px] h-auto rounded-md shadow-md mb-2"
                                            />
                                            <span className="text-sm text-gray-500">Mask</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 mt-4">No history found for this location.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default History;
