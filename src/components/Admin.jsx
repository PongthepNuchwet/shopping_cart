import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Menu from './menuAdmin'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Admin() {

    const navigate = useNavigate();

    document.title = 'Admin'

    const SignOut = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/signin')
    }

    return (
        <>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <h1>Admin</h1>
            <button onClick={SignOut}>SignOut</button>
            <Menu />
            <Outlet />
        </>

    )
}