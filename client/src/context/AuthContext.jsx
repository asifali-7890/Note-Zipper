import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch user profile from /api/user/profile
    const fetchUserProfile = async (token) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to request
                },
            };
            const { data } = await axios.get('/api/users/profile', config);
            setUser(data); // Update user data with fetched profile
        } catch (error) {
            setError('Failed to fetch user profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Simulate user fetching and token handling
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile(token); // Fetch user data using token
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('token', userData); // Store the token
        fetchUserProfile(userData); // Fetch user profile and update context
    };

    const logout = () => {
        localStorage.removeItem('token'); // Remove the token
        setUser(null); // Clear user data
        navigate('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
