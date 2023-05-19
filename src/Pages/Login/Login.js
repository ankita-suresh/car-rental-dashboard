/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.scss';

export default function Login() {
    const { authIsReady, user } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isPending, login, error } = useLogin();
    const navigate = useNavigate();
    // eslint-disable-next-line consistent-return
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('before login()');
        // this is where i made a single change okk
        login(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>LOG INTO ROGO</h2>
            <label>
                <span>Email</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label>
                <span>Password</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className="btn">Login</button>}

            {isPending && (
                <button className="btn" disabled>
                    loading...
                </button>
            )}
            {error && <p>{error}</p>}
        </form>
    );
}
