import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpLogin, setIsOtpLogin] = useState(false); // Toggle for OTP login
    const [otpSent, setOtpSent] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const endpoint = isOtpLogin ? "/auth/verify-otp" : "/auth/login";
        const body = isOtpLogin ? { email, otp } : { email, password };

        const response = await fetch(`http://localhost:5000${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Login successful!");
        } else {
            alert(`Login Failed: ${data.error}`);
        }
    };

    const sendOtp = async () => {
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
            alert(`Error: ${data.error}`);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-4">
                {isOtpLogin ? "Login with OTP" : "Login with Password"}
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
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
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 border rounded"
                                required
                            />
                        ) : (
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
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                )}

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Login
                </button>
            </form>

            <button
                onClick={() => setIsOtpLogin(!isOtpLogin)}
                className="w-full text-blue-500 mt-4 underline"
            >
                {isOtpLogin ? "Login with Password" : "Login with OTP"}
            </button>
        </div>
    );
};

export default Login;
