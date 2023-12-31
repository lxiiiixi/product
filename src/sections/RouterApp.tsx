import {
    Route,
    Routes,
    useLocation,
    Navigate,
    type RouteObject
} from 'react-router-dom';
import routes from '@/config/router';

function RouterApp() {
    const location = useLocation();
    const { pathname } = location;

    const token = true; // get token

    const handleRedirect = (item: RouteObject) => {
        if (pathname === '/') {
            return <Navigate to="/dashboard" />;
        }
        // if (pathname === '/login' && !!token) {
        //   return <Navigate to="/dashboard" />;
        // }
        if (pathname !== '/login' && !token) {
            return <Navigate to="/login" replace={true} />;
        }
        return item.element;
    };

    const RouteNav = (param: RouteObject[]) => {
        return param.map(item => {
            return (
                <Route
                    path={item.path}
                    key={item.path}
                    element={handleRedirect(item)}
                >
                    {item?.children && RouteNav(item.children)}
                </Route>
            );
        });
    };

    return <Routes>{RouteNav(routes)}</Routes>;
}

export default RouterApp;
