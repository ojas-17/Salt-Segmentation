import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/Upload";

import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />}/>
                    <Route path="/history" element={<History />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
