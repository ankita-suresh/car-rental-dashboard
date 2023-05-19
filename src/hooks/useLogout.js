import { useEffect, useState } from 'react';

import { projectAuth } from '../firebase/config';
import useAuthContext from './useAuthContext';
// eslint-disable-next-line import/prefer-default-export
export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            // thats a lottt nonono  seri pavamnu sonna
            await projectAuth.signOut();

            dispatch({ type: 'LOGOUT' });
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    };
    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);
    return { logout, error, isPending };
};
