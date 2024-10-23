import {useEffect, useState} from 'react';
import {useAuth} from './context/authContext';
import LoginView from './views/loginView';
import UserDataView from './views/userDataView';
import HomeView from "./views/homeView";
import NotFoundView from "./views/404view";

const Router = () => {
    const {isLoggedIn} = useAuth();
    const [path, setPath] = useState(window.location.pathname);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLocationChange = () => {
            setPath(window.location.pathname);
        };

        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [isLoggedIn]);

    const renderRoute = () => {
        if (loading) return null;

        switch (path) {
            case '/':
                return isLoggedIn ? <UserDataView/> : <HomeView/>;
            case '/login':
                return isLoggedIn ? <UserDataView/> : <LoginView/>;
            case '/data':
                return isLoggedIn ? <UserDataView/> : <LoginView/>;
            default:
                return <NotFoundView/>;
        }
    };

    return <>{renderRoute()}</>;
};

export default Router;
