import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children, user }) {
    if (user) {
        return <Navigate to="/" />;
    }

    return children;
}
