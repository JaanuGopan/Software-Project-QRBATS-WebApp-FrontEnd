import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);

    // Function to handle login
    const login = async (userName, password) => {
        try {
            const response = await axios.get(`/api/v1/auth/login?userName=${userName}&password=${password}`);
            const { token, refreshToken, user } = response.data;
            console.log(response.data);

            localStorage.setItem("authToken", token);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", JSON.stringify(user));

            setAuthToken(token);
            setUser(user);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setAuthToken(null);
        setUser(null);
    };

    // Auto-fetch user details if token is present
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set auth token globally

            axios.get("/api/v1/auth/user")
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => logout());
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
