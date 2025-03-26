import { Navigate, Outlet } from "react-router-dom";

// Function to check if user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, false otherwise
};

// Protected Route Component
const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
