import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";

function EditProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { login } = useContext(AuthContext); // Using the login function from AuthContext


    // Fetch profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authorization token found!");
                return;
            }

            try {
                setLoading(true);
                const { data } = await axios.get("/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setName(data.name);
                setEmail(data.email);
                setLoading(false);
            } catch (error) {
                setError("Failed to load profile data");
                console.error("Error fetching profile:", error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const resetHandler = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No authorization token found!");
            return;
        }

        try {
            const updatedData = { name, email, password, confirmPassword };
            setLoading(true);

            await axios.put("/api/users/profile", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Profile updated successfully");
            login(token);
            resetHandler();
            navigate("/");
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4  min-h-[calc(100vh-170px)] ">
            <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a new password"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                    >
                        Update Profile
                    </button>
                    <button
                        type="button"
                        onClick={resetHandler}
                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                    >
                        Reset Fields
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
