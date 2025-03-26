/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpLogin, setIsOtpLogin] = useState(false); // Toggle for OTP login
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState(""); // Error handling
    const navigate = useNavigate(); // Redirect after login

    // Function to handle login (Password or OTP)
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const endpoint = isOtpLogin ? "/auth/verify-otp" : "/auth/login";
        const body = isOtpLogin ? { email, otp } : { email, password };

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token); // Store JWT token
                navigate("/dashboard"); // Redirect to dashboard
            } else {
                setError(data.error || "Login Failed!");
            }
        } catch (err) {
            setError("Server Error! Try again later.");
        }
    };

    // Function to send OTP
    const sendOtp = async () => {
        setError("");

        try {
            const response = await fetch("http://localhost:5000/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("OTP sent to your email.");
                setOtpSent(true);
            } else {
                setError(data.error || "Failed to send OTP.");
            }
        } catch (err) {
            setError("Server Error! Try again later.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-4">
                {isOtpLogin ? "Login with OTP" : "Login with Password"}
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error messages */}

            <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />

                {isOtpLogin ? (
                    <>
                        {otpSent ? (
                            // OTP Input
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        ) : (
                            // Send OTP Button
                            <button
                                type="button"
                                onClick={sendOtp}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Send OTP
                            </button>
                        )}
                    </>
                ) : (
                    // Password Input
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                )}

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Login
                </button>
            </form>

            {/* Toggle Between Password and OTP Login */}
            <button
                onClick={() => {
                    setIsOtpLogin(!isOtpLogin);
                    setOtpSent(false); // Reset OTP state
                }}
                className="w-full text-blue-500 mt-4 underline"
            >
                {isOtpLogin ? "Login with Password" : "Login with OTP"}
            </button>
        </div>
    );
};

export default Login;
