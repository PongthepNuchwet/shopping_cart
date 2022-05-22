import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AddItem } from "../../services/slice/Cart";

export default function Products() {

    const dispatch = useDispatch()

    const products = useSelector((state) => state.products.data)
    const uid = useSelector((state) => state.customer.uid)

    const [amount, setAmount] = useState({});


    useEffect(() => {
        Object.keys(products).map((key) => {
            let newData = {}
            newData[key] = 0
            setAmount(amount => ({ ...amount, ...newData }))
        })
    }, [products])

    const increment = (key) => {
        if (amount[key] < products[key].inventory) {
            let newData = {}
            newData[key] = amount[key] + 1
            setAmount(amount => ({ ...amount, ...newData }))
        }

    }

    const decrement = (key) => {
        if (amount[key] - 1 >= 0) {
            let newData = {}
            newData[key] = amount[key] - 1
            setAmount(amount => ({ ...amount, ...newData }))
        }

    }

    const onBuy = (key) => {

        const data = {
            product_id: key,
            purchasedAmount: amount[key]
        }
        console.log("onBuy", data)
        dispatch(AddItem(data))
        let newData = {}
        newData[key] = 0
        setAmount(amount => ({ ...amount, ...newData }))
    }


    return (
        <>
            <div className="container" >
                <div className="row">

                    {
                        Object.keys(products).map((key, index) => (
                            <div className="col-3" key={key}>
                                <div className="card w-100" >
                                    <img src={products[key].imageUrl} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">{products[key].name}</p>
                                        <p className="card-text">{products[key].desc}</p>
                                        <p className="card-text">Price :{products[key].price}</p>
                                        <p className="card-text">Amount :{products[key].inventory}</p>
                                        <div className="row">
                                            <div className="col-4">
                                                <button onClick={(e) => { decrement(key) }} >-</button>
                                            </div>
                                            <div className="col-4">
                                                <p>{amount[key]}</p>
                                            </div>
                                            <div className="col-4">
                                                <button onClick={(e) => { increment(key) }} >+</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <button onClick={(e) => { onBuy(key) }}>BUY</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                </div>
            </div>
        </>

    )


}