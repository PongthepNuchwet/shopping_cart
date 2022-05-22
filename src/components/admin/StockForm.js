import React, { useState } from "react";
import { storage } from '../../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';



export default function StockForm(props) {



    const handleUpdate = async () => {
        console.log("handleUpdate :", props.Key, props.data)
        if (props.Key) {
            if (props.Image) {
                await props.DeleteImage(props.data[props.Key].image)
                await handleUpload(props.updateFirestore)
            } else {
                await props.updateFirestore(null)
                console.log("handleUpdated")
            }
        }
    }


    const handleCreate = async (e) => {
        await handleUpload(props.saveFirestore)
    }

    const handleChange = async e => {
        console.log("handleChange")
        if (props.inputImage.current.files[0]) {
            const file = props.inputImage.current.files[0]
            await props.setImage(file)
            await props.setImageUrl(URL.createObjectURL(file))
            props.setBtnDisabled(false)
        }
    }

    const handleUpload = async (next) => {
        const newName = uuidv4() + '.' + props.Image.name.split(".").at(-1);
        const storageRef = ref(storage, `products/${newName}`)
        const uploadTask = uploadBytesResumable(storageRef, props.Image)

        uploadTask.on('state_changed',
            (snapshot) => {
                props.setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log('Upload is ' + props.progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    next(downloadURL, newName);

                });

                console.log("completed")
            })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div >
                        <p>{props.progress}%</p>
                        <progress value={props.progress} max="100" />

                        <input ref={props.inputImage} type="file" onChange={handleChange} />


                        <img src={props.imageUrl || 'http://via.placeholder.com/400x300'} alt="Uploaded images" />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">name</label>
                        <input ref={props.inputName} onChange={(e) => { props.setName(e.target.value) }} value={props.Name} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Desc</label>
                        <textarea value={props.Desc} ref={props.inputDesc} onChange={(e) => { props.setDesc(e.target.value) }} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">price</label>
                        <input onChange={(e) => { props.setPrice(e.target.value) }} value={props.Price} ref={props.inputPrice} type="number" className="form-control" id="exampleFormControlTextarea1" rows="3" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">amount</label>
                        <input onChange={(e) => { props.setAmount(e.target.value) }} value={props.Amount} ref={props.inputAmount} type="number" className="form-control" min={0} />
                    </div>
                </div>
                <div className="row">
                    <button onClick={props.clear}>cls</button>
                    {
                        props.action === 'ACTION_CREATE'
                            ? <button onClick={handleCreate} disabled={props.btnDisabled}>Upload</button>
                            : <button onClick={handleUpdate} >Update</button>
                    }
                </div>
            </div>
        </>
    )
}