import React, { useState } from "react";
import axios from "../services/api";

function Upload() {
    const [file, setFile] = useState(null);
    const [location, setLocation] = useState("");
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file || !location) {
            setError("Please select a file and enter a location.");
            return;
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append("image", file);
        formData.append("location", location);

        try {
            const res = await axios.post("/upload", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setOutput(res.data);
        } catch (err) {
            setError("Upload failed: " + err.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Upload Image</h2>
                
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:mr-4 file:rounded-full file:border file:border-gray-300 file:bg-gray-50"
                    />
                </div>

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
                        onClick={handleUpload}
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md text-white ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                        }`}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>

                {output && (
                    <div>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Prediction Results:</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex justify-center">
                                <img
                                    src={`http://localhost:5000${output.imagePath}`}
                                    alt="Uploaded"
                                    className="max-w-full h-auto rounded-md shadow-md"
                                />
                            </div>
                            <div className="flex justify-center">
                                <img
                                    src={`http://localhost:5000${output.maskPath}`}
                                    alt="Predicted Mask"
                                    className="max-w-full h-auto rounded-md shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Upload;
