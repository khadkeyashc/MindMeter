import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import axios from "axios";

export default function Layout() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/user/", config);
                    setLoggedIn(true);
                    setUsername(response.data.username);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                setLoggedIn(false);
                navigate("/login");
            }
        };
        checkLoggedInUser();
    }, [navigate]);

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
            <main className="layout-main">
                <Outlet context={{ isLoggedIn, username }} />
            </main>
        </>
    );
}
