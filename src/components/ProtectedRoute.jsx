import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
export default function ProtectedRoute({ allowedRoles }) {

    const location = useLocation();
    const uid = useSelector((state) => state.customer.uid) || sessionStorage.getItem('uid')
    const role = useSelector((state) => state.customer.role) || sessionStorage.getItem('role')
    console.log(sessionStorage.getItem('uid'), sessionStorage.getItem('role'))
    console.log(uid, role)

    return (
        allowedRoles?.includes(role)
            ? <Outlet />
            : uid
                ? role === 'ROLE_ADMIN'
                    ? <Navigate to="/admin" state={{ from: location }} replace />
                    : <Navigate to="/" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}