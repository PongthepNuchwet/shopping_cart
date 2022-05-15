import React from "react";
import { db } from '../../firebase-config'
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setAction, setKey, setImageUrl, setTitle, setDesc } from "../../services/slice/Announce";

import Table from 'react-bootstrap/Table'

export default function AnnounceTable(props) {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.announce.data)

    const onEdite = async (e, key) => {
        console.log("onEdite : ", key, data[key])
        dispatch(setImageUrl(data[key].imageUrl))
        dispatch(setTitle(data[key].title))
        dispatch(setDesc(data[key].desc))
        dispatch(setAction("ACCION_UPDATE"))
        dispatch(setKey(key))
    }
    const Delete = async (e, key) => {
        console.log("onDelete : ", key)
        await deleteDoc(doc(db, "announce", key));
        await props.DeleteImage(data[key].name)
        props.clear()
    }



    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((key, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={data[key].imageUrl} alt="" height={100} />
                            </td>
                            <td>{data[key].title}</td>
                            <td>{data[key].desc}</td>
                            <td>
                                <button onClick={e => { onEdite(e, key) }} >edite</button>
                                <button onClick={e => { Delete(e, key) }}>delete</button>
                            </td>
                        </tr>
                    ))}
                    {
                        Object.keys(data).length < 1
                            ? (<tr><td colSpan={5}><h3>Not found</h3></td></tr>)
                            : ''
                    }
                </tbody>
            </Table>
        </>
    )
}