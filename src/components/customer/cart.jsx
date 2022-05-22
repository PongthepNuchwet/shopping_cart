import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu from "./menu";

export default function Cart() {

    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart.Items)
    const products = useSelector((state) => state.products.data)

    const elements = ['one', 'two', 'three'];



    const SignOut = () => {
        sessionStorage.clear()
        navigate('/signout')
    }

    return (
        <>
            <h1>cart </h1>
            <button onClick={SignOut}>SignOut</button>
            <Menu />
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {
                            cart.map((item, index) => {
                                return (
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4">
                                                    <img src={products[item.product_id].imageUrl} className="card-img-top" alt="..." />
                                                </div>
                                                <div className="col-4">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {products[item.product_id].name}
                                                        </div>
                                                        <div className="col-12">
                                                            {products[item.product_id].desc}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="col-12">
                                                        {products[item.product_id].price}
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-4">-</div>
                                                            <div className="col-4">{item.purchasedAmount}</div>
                                                            <div className="col-4">+</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }

                    </div>
                    <div className="col-6"></div>
                </div>
            </div>
        </>
    )


}