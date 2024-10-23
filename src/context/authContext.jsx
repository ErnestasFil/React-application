import {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const CACHE_KEY = 'user';
    const CACHE_TIME_KEY = 'userTime';
    const CACHE_DURATION = 10 * 60 * 1000;

    useEffect(() => {
        const storedUser = sessionStorage.getItem(CACHE_KEY);
        const cacheFetchTime = sessionStorage.getItem(CACHE_TIME_KEY);
        const isCacheValid = cacheFetchTime && (Date.now() - Number(cacheFetchTime)) < CACHE_DURATION;
        if (storedUser && isCacheValid) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);

    const login = (userData) => {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(userData));
        sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem(CACHE_KEY);
        sessionStorage.removeItem(CACHE_TIME_KEY);
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
