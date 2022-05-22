import React, { useState } from 'react';
import { db, auth } from '../firebase-config'
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setCustomer } from '../services/slice/customer'

import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";



export default function SignIn() {

    defineLordIconElement(loadAnimation);



    const navigate = useNavigate();
    const dispatch = useDispatch()


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(undefined);


    const goToSignUp = () => {
        navigate('/signup')
    }

    const handleAction = (event) => {
        event.preventDefault();
        if (email.length > 0 && password.length > 0) {
            console.log("signInWithEmailAndPassword")
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // console.log("updateDoc")
                    // await updateDoc(doc(db, "users", userCredential.user.uid), {
                    //     "lastLoginAt": userCredential.user.metadata.lastLoginAt,
                    //     "accessToken": userCredential.user.stsTokenManager.accessToken,
                    //     "refreshToken": userCredential.user.stsTokenManager.refreshToken
                    // });
                    console.log("getDoc")
                    const querySnapshot = await getDoc(doc(db, "users", userCredential.user.uid));

                    let data = querySnapshot.data()
                    if (querySnapshot.exists()) {
                        console.log("Document data:", querySnapshot.data());

                    } else {
                        console.log("No such document!");
                    }

                    dispatch(setCustomer({
                        uid: data.uid,
                        name: data.name,
                        phone: data.phone,
                        address: data.address,
                        role: data.role
                    }))

                    sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken)
                    sessionStorage.setItem('uid', data.uid)
                    sessionStorage.setItem('name', data.name)
                    sessionStorage.setItem('phone', data.phone)
                    sessionStorage.setItem('address', data.address)
                    sessionStorage.setItem('role', data.role)

                    if (data.role === 'ROLE_CUSTOMER') {
                        navigate('/');
                    } else {
                        navigate('/admin');
                    }


                    // switch (data.role) {
                    //     case 'ROLE_CUSTOMER':
                    //         navigate('/home'); break;
                    //     case 'ROLE_ADMIN':
                    //         navigate('/admin'); break;
                    //     default:
                    //         navigate('/'); break;
                    // }


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

    const onChang = (event, setValue) => {
        setValue(event.target.value.trim())
    }

    return (
        <>
            <lord-icon trigger="hover" onClick={(e) => { console.log("click") }} src='/8-account-solid-edited.json'></lord-icon>
            <h1>Sign_in</h1>
            <form onSubmit={handleAction}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => onChang(e, setEmail)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => onChang(e, setPassword)} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <button onClick={goToSignUp}>Sign Up</button>

            {
                error && (
                    <p>{error}</p>
                )
            }
        </>
    )
}