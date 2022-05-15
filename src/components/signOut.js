import React from 'react';
import { useDispatch } from 'react-redux'
import { clear } from '../services/slice/customer'

import { Navigate, useLocation } from 'react-router-dom';

export default function SignOut() {
    const dispatch = useDispatch();
    const location = useLocation();

    dispatch(clear)
    sessionStorage.clear()


    return (
        <Navigate to="/signin" state={{ from: location }} replace />
    )
}