import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Ensure CSS is applied

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Redirect after successful registration

    // Handles input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Basic validation check
        if (!formData.username || !formData.email || !formData.password1 || !formData.password2) {
            setError("All fields are required.");
            setIsLoading(false);
            return;
        }

        if (formData.password1 !== formData.password2) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                username: formData.username,
                email: formData.email,
                password1: formData.password1, // Django expects "password1" and "password2"
                password2: formData.password2
            });

            console.log("Success!", response.data);
            setSuccessMessage("Registration Successful! Redirecting to Login...");

            // Redirect to login page after 2 seconds
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.log("Registration failed:", error.response?.data);
            setError(error.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            
            <h2>Register</h2>
            
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                />

                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>

            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}
