import {AuthProvider} from '../context/authContext';
import {ThemeProvider} from "../components/themeContext";
import NavBar from '../components/navBar';
import Router from '../router';

const App = () => {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
                <AuthProvider>
                    <NavBar/>
                    <Router/>
                </AuthProvider>
            </div>
        </ThemeProvider>
    );
};

export default App;
