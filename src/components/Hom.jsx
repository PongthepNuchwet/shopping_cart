import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Announce from './customer/announce'
import Products from './customer/products'
import Menu from './customer/menu';

export default function Home() {


    const navigate = useNavigate();

    const SignOut = () => {
        sessionStorage.clear()
        navigate('/signout')
    }

    return (
        <>
            <h1>Home </h1>
            <button onClick={SignOut}>SignOut</button>
            <br />
            <Menu />
            <Announce />
            <Products />
        </>

    )
}