import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Signup failed");

            setSuccess("Signup successful! Redirecting...");
            setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2s
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>

                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>}

                <form onSubmit={handleSignup} className="mt-4">
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-600 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
