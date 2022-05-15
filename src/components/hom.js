import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    useEffect(() => {
        document.title = 'Home'
    }, []);


    const navigate = useNavigate();

    document.title = 'Home'

    const SignOut = () => {
        sessionStorage.clear()
        navigate('/signout')
    }

    return (
        <>
            <h1>Home</h1>
            <button onClick={SignOut}>SignOut</button>
        </>

    )
}