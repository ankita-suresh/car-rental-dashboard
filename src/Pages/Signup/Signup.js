/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import styles from './Signup.module.scss';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        const displayName = `${firstName} ${lastName}`;
        // console.log(email, password, displayName);
        signup(email, password, displayName);
    };

    return (
        <form onSubmit={handleSubmit} className={styles['Signup-form']}>
            <h2>SIGN INTO ROGO</h2>
            <label>
                <span>First Name</span>
                <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                />
            </label>
            <label>
                <span>Last Name</span>
                <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </label>

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
            <label>
                <span>Confirm Password</span>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
            </label>
            {!isPending && <button className="btn">Sign Up</button>}
            {isPending && (
                <button className="btn" disabled>
                    Loading
                </button>
            )}

            {error && <p>{error}</p>}
        </form>
    );
}
