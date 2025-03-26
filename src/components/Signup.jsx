import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation

const Signup = () => {
    const navigate = useNavigate(); // Hook for redirection

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        spendingHabits: "",
        spendingCategories: [],
    });

    const spendingOptions = [
        "Groceries", "Dining", "Entertainment", "Travel", "Shopping",
        "Education", "Healthcare", "Transportation", "Bills", "Investments"
    ];

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle checkbox selection for spending categories
    const handleCheckboxChange = (category) => {
        setFormData((prevState) => {
            const { spendingCategories } = prevState;
            return {
                ...prevState,
                spendingCategories: spendingCategories.includes(category)
                    ? spendingCategories.filter((item) => item !== category)
                    : [...spendingCategories, category],
            };
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem("token", data.token);

                alert("Signup successful! Redirecting to Dashboard...");
                navigate("/dashboard"); // Redirect user to Dashboard
            } else {
                alert(data.error || "Signup failed");
            }
        } catch (error) {
            console.error(error);
            alert("Error signing up");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />

                <textarea name="spendingHabits" placeholder="Describe your spending habits" onChange={handleChange} className="w-full p-2 border rounded"></textarea>

                <fieldset>
                    <legend className="text-lg font-semibold">Select Spending Categories:</legend>
                    <div className="grid grid-cols-2 gap-2">
                        {spendingOptions.map((category) => (
                            <label key={category} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.spendingCategories.includes(category)}
                                    onChange={() => handleCheckboxChange(category)}
                                />
                                <span>{category}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Signup</button>
            </form>

            <p className="mt-4 text-center">
                Already have an account? <a href="/login" className="text-blue-600">Login here</a>
            </p>
        </div>
    );
};

export default Signup;
