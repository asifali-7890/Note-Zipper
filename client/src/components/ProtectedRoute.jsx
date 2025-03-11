import { Navigate } from 'react-router-dom';

// Dummy authentication check function (replace with real logic)
const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Example: Checking if token is in localStorage
};

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }
    // Render the protected component
    return children;
};

export default ProtectedRoute;
