import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';



export default function SignUp() {
    useEffect(() => {
        document.title = 'SignUp'
    }, []);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(undefined);

    const handleAction = (event) => {
        event.preventDefault();
        console.log(email, password, password2)
        if (password === password2) {
            setError(undefined)
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    console.log(userCredential)
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        "uid": userCredential.user.uid,
                        "name": name,
                        "address": address,
                        "phone": phone,
                        "role": 'ROLE_CUSTOMER',
                        "email": userCredential.user.email,
                        "createdAt": userCredential.user.metadata.createdAt,
                        "lastLoginAt": userCredential.user.metadata.lastLoginAt,
                        "accessToken": userCredential.user.stsTokenManager.accessToken,
                        "expirationTime": userCredential.user.stsTokenManager.expirationTime,
                        "refreshToken": userCredential.user.stsTokenManager.refreshToken
                    });

                    navigate('/signin')
                })
                .catch((error) => {
                    console.log(error.code)
                    if (error.code === 'auth/email-already-in-use') {
                        setError("Email Already in Use")
                    } else if (error.code === 'auth/weak-password') {
                        setError("Password is not secure")
                    }
                });
        } else {
            setError("Passwords do not match")
        }

    }

    const onChang = (event, setValue) => {
        setValue(event.target.value.trim())
    }


    const goToSignIn = () => {
        navigate('/signin')
    }


    return (
        <>
            <h1>Sign_up</h1>
            <form onSubmit={handleAction}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => onChang(e, setName)} />
                </label><br />
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => onChang(e, setAddress)} />
                </label><br />
                <label>
                    Phone number:
                    <input type="text" value={phone} onChange={(e) => onChang(e, setPhone)} />
                </label><br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => onChang(e, setEmail)} />
                </label><br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => onChang(e, setPassword)} />
                </label><br />
                <label>
                    Password 2 :
                    <input type="password" value={password2} onChange={(e) => onChang(e, setPassword2)} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <br />
            <button onClick={goToSignIn}>Sign In</button>
            {
                error && (
                    <p>{error}</p>
                )
            }
        </>

    )
}