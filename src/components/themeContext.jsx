import {createContext, useContext, useEffect, useState} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = sessionStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        sessionStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, []);

    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
