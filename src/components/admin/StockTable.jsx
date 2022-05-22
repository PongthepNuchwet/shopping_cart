import React from "react";
import { db } from '../../firebase-config'
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
// import { setAction, setKey, setImageUrl, setTitle, setDesc } from "../../services/slice/Product";

import Table from 'react-bootstrap/Table'

export default function ProductTable(props) {
    const dispatch = useDispatch()


    const onEdite = async (e, key) => {
        props.clear()
        console.log("onEdite : ", key, props.data[key])
        props.setName(props.data[key].name)
        props.setDesc(props.data[key].desc)
        props.setPrice(props.data[key].price)
        props.setAmount(props.data[key].amount)
        props.setAction("ACCION_UPDATE")
        props.setImageUrl(props.data[key].imageUrl)
        props.setKey(key)
    }
    const Delete = async (e, key) => {
        console.log("onDelete : ", key, props.data[key])
        await deleteDoc(doc(db, "products", key));
        await props.DeleteImage(props.data[key].image)
        props.clear()
    }



    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Desc</th>
                        <th>price</th>
                        <th>amount</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(props.data).map((key, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={props.data[key].imageUrl} alt="" height={100} />
                            </td>
                            <td>{props.data[key].name} </td>
                            <td>{props.data[key].desc}</td>
                            <td>{props.data[key].price}</td>
                            <td>{props.data[key].amount}</td>
                            <td>
                                <button onClick={e => { onEdite(e, key) }} >edite</button>
                                <button onClick={e => { Delete(e, key) }}>delete</button>
                            </td>
                        </tr>
                    ))}
                    {
                        Object.keys(props.data).length < 1
                            ? (<tr><td colSpan={5}><h3>Not found</h3></td></tr>)
                            : ''
                    }
                </tbody>
            </Table>
        </>
    )
}