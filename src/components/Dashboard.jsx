import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login"); // Redirect if no token
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/user/dashboard", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Ensure Bearer token format
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUserData(data);
                } else {
                    console.error("Error:", data.error);
                    localStorage.removeItem("token"); // Remove invalid token
                    navigate("/login"); // Redirect to login on failure
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchData();
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            {userData ? (
                <>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Welcome, {userData.firstName}!</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>

                    <p className="mt-2 text-gray-700">
                        <strong>Spending Habits:</strong> {userData.spendingHabits || "Not provided"}
                    </p>

                    <h2 className="text-xl mt-4 font-semibold">Your Spending Categories</h2>
                    {userData.spendingCategories?.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {userData.spendingCategories.map((category, index) => (
                                <li key={index} className="text-gray-600">{category}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No spending categories selected.</p>
                    )}

                    <h2 className="text-xl mt-4 font-semibold">Recent Transactions</h2>
                    {userData.transactions?.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {userData.transactions.map((transaction, index) => (
                                <li key={index} className="text-gray-600">
                                    {transaction.category}: ${transaction.amount} on{" "}
                                    {new Date(transaction.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No recent transactions available.</p>
                    )}
                </>
            ) : (
                <p className="text-gray-600 text-center">Loading dashboard...</p>
            )}
        </div>
    );
};

export default Dashboard;
