import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navigation = ({ isLoggedIn, setLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                const config = { headers: { Authorization: `Bearer ${accessToken}` } };
                await axios.post("http://127.0.0.1:8000/api/logout/", { refresh: refreshToken }, config);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setLoggedIn(false);
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <nav className="navbar">
            <ul>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
