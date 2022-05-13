import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function SignOut() {
    const navigate = useNavigate();
    sessionStorage.removeItem('Auth Token');
    navigate('/signin')
}