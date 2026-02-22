import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Rehydrate from localStorage
        const storedToken = localStorage.getItem("alfraj_token");
        const storedUser = localStorage.getItem("alfraj_user");

        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("alfraj_token");
                localStorage.removeItem("alfraj_user");
            }
        }
        setLoading(false);
    }, []);

    function login(userData, tokenValue) {
        setUser(userData);
        setToken(tokenValue);
        localStorage.setItem("alfraj_token", tokenValue);
        localStorage.setItem("alfraj_user", JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("alfraj_token");
        localStorage.removeItem("alfraj_user");
    }

    function updateUser(userData) {
        setUser(userData);
        localStorage.setItem("alfraj_user", JSON.stringify(userData));
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
