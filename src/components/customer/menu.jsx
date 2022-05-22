import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Menu() {

    const cart = useSelector((state) => state.cart.Items)
    const navigate = useNavigate();

    return (
        <>
            <div className="row">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={(e) => navigate('/')} className="btn btn-primary">Home</button>
                    <button type="button" onClick={(e) => navigate('/cart')} className="btn btn-primary">
                        Cart <span className="badge bg-secondary"> {cart.length}</span>
                    </button>
                </div>
            </div>
        </>
    )
}