import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Menu from './menuAdmin'

export default function Admin() {
    useEffect(() => {
        document.title = 'Admin'
    }, []);

    const navigate = useNavigate();

    document.title = 'Admin'

    const SignOut = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/signin')
    }

    return (
        <>
            <h1>Admin</h1>
            <button onClick={SignOut}>SignOut</button>
            <Menu />
            <Outlet />
        </>

    )
}