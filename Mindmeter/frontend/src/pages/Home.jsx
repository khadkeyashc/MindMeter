import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Home.css';

export default function Home() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("accessToken"));
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get("http://127.0.0.1:8000/api/user/", config);
                
                setUsername(response.data.username);
                localStorage.setItem("username", response.data.username);
                setLoggedIn(true);
            } catch (error) {
                console.error("Session expired. Please log in again.");
                handleLogout();
            }
        };

        if (!username) {
            fetchUser();
        }
    }, [navigate, username]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                const config = { headers: { Authorization: `Bearer ${accessToken}` } };
                await axios.post("http://127.0.0.1:8000/api/logout/", { refresh: refreshToken }, config);
            }
        } catch (error) {
            console.warn("Logout request failed, but proceeding with local logout.");
        } finally {
            localStorage.clear();
            setLoggedIn(false);
            navigate("/login");
        }
    };

    return (
        <div className="app-container">
            {isLoggedIn ? (
                <>
                    <nav className="app-navbar">
                        <div className="navbar-brand">
                            <span className="platform-name">BrainBench</span>
                            <p>New Worlds, New Way to Succeed</p>
                        </div>
                        <div className="nav-items">
                            <button className="nav-item">Dashboard</button>
                            <button className="nav-item">Contests</button>
                            <Link to="/test" className="nav-item">Practice Tests</Link>
                            <div className="profile-section" ref={dropdownRef}>
                                <button 
                                    className="profile-button"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    tabIndex="0"
                                >
                                    <span className="user-icon">👤</span>
                                    <span className="username">{username}</span>
                                    <span className="dropdown-arrow">▾</span>
                                </button>

                                {showDropdown && (
                                    <div className="profile-dropdown">
                                        <div className="dropdown-item">
                                            <span className="icon">📝</span> My Profile
                                        </div>
                                        <div className="dropdown-item">
                                            <span className="icon">⚙️</span> Account Settings
                                        </div>
                                        <div className="dropdown-item" onClick={handleLogout}>
                                            <span className="icon">🚪</span> Logout
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>

                    <main className="main-content">
                        <header className="welcome-header">
                            <h1>Welcome Back, {username}!</h1>
                            <p className="subtitle">Ready for today's learning session?</p>
                        </header>

                        <div className="features-grid">
                            <div className="feature-card mock-tests">
                                <div className="card-content">
                                    <h3>Mock Tests</h3>
                                    <p>Simulate real exam conditions with timed tests</p>
                                    <Link to="/test" className="card-action">Start Test →</Link>
                                </div>
                            </div>
                            <div className="feature-card topic-prep">
                                <div className="card-content">
                                    <h3>Topic Preparation</h3>
                                    <p>Master individual topics with curated resources</p>
                                    <button className="card-action">Explore Topics →</button>
                                </div>
                            </div>
                            <div className="feature-card contests">
                                <div className="card-content">
                                    <h3>Upcoming Contests</h3>
                                    <p>Join scheduled competitions and challenges</p>
                                    <button className="card-action">View Schedule →</button>
                                </div>
                            </div>
                            <div className="feature-card progress">
                                <div className="card-content">
                                    <h3>Your Progress</h3>
                                    <div className="progress-metrics">
                                        <div className="metric">
                                            <span className="value">12</span>
                                            <span className="label">Tests Taken</span>
                                        </div>
                                        <div className="metric">
                                            <span className="value">87%</span>
                                            <span className="label">Accuracy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                <div className="auth-redirect">
                    <h2>Please Login to Continue</h2>
                    <button onClick={() => navigate("/login")}>Go to Login</button>
                </div>
            )}
        </div>
    );
}
