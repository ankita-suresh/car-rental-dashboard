import { useEffect, useState } from 'react';

import { projectAuth } from '../firebase/config';
import useAuthContext from './useAuthContext';

// eslint-disable-next-line import/prefer-default-export
export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);
        try {
            console.log('before signIn fires');
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            console.log(isPending);
            console.log(res.user);
            dispatch({ type: 'LOGIN', payload: res.user });

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
    return { login, error, isPending };
};
