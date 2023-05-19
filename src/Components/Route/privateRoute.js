import { Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import Home from '../Home/Home';

function PrivateRoutes() {
    const { authIsReady, user } = useAuthContext();

    // it checks if u are valid auth user then goes to home page if u are not u will go to login page ok?
    return user ? <Home /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
