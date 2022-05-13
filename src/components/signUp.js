import React, { useState, } from 'react';
import app from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(undefined);


    const auth = getAuth();
    const db = getFirestore();




    const handleAction = (event) => {
        event.preventDefault();
        console.log(email, password, password2)
        if (password === password2) {
            setError(undefined)
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    console.log(userCredential)
                    console.log(userCredential.user.stsTokenManager)
                    const docRef = await setDoc(doc(db, "users", userCredential.user.uid), {
                        "uid": userCredential.user.uid,
                        "name": name,
                        "address": address,
                        "phone": phone,
                        "roles": 'ROLE_CUSTOMER',
                        "email": userCredential.user.email,
                        "createdAt": userCredential.user.metadata.createdAt,
                        "lastLoginAt": userCredential.user.metadata.lastLoginAt,
                        "accessToken": userCredential.user.stsTokenManager.accessToken,
                        "expirationTime": userCredential.user.stsTokenManager.expirationTime,
                        "refreshToken": userCredential.user.stsTokenManager.refreshToken
                    });
                    console.log("docRef", docRef)

                    navigate('/signin')
                })
                .catch((error) => {
                    console.log(error.code)
                    if (error.code === 'auth/email-already-in-use') {
                        setError("Email Already in Use")
                    }
                });
        } else {
            setError("Passwords do not match")
        }

    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }
    const onChangeAddress = (event) => {
        setAddress(event.target.value)
    }
    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }
    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const onChangePassword2 = (event) => {
        setPassword2(event.target.value)
    }


    return (
        <>
            <h1>Sign_up</h1>
            <form onSubmit={handleAction}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={onChangeName} />
                </label><br />
                <label>
                    Address:
                    <input type="text" value={address} onChange={onChangeAddress} />
                </label><br />
                <label>
                    Phone number:
                    <input type="text" value={phone} onChange={onChangePhone} />
                </label><br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={onChangeEmail} />
                </label><br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={onChangePassword} />
                </label><br />
                <label>
                    Password 2 :
                    <input type="password" value={password2} onChange={onChangePassword2} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <br />
            {
                error && (
                    <p>{error}</p>
                )
            }
        </>

    )
}