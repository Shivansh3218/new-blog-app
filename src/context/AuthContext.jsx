"use client";
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userFromCookies = Cookies.get('user');
        if (userFromCookies) {
            setUser(JSON.parse(userFromCookies));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };