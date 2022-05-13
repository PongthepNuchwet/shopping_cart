import React, { useState, } from 'react';
import app from '../firebase-config'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(undefined);


    const auth = getAuth();

    const handleAction = (event) => {
        event.preventDefault();
        if (email.length > 0 && password.length > 0) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                    sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken)
                    navigate('/home')
                })
                .catch((error) => {
                    console.log(error)
                    if (error.code === 'auth/wrong-password') {
                        setError('Please check the Password');
                    }
                    if (error.code === 'auth/user-not-found') {
                        setError('Please check the Email');
                    }
                });
        }

    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }



    return (
        <>
            <h1>Sign_in</h1>
            <form onSubmit={handleAction}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={onChangeEmail} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={onChangePassword} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            {
                error && (
                    <p>{error}</p>
                )
            }
        </>
    )
}