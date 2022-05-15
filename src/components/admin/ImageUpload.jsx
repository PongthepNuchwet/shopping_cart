import React, { useState } from "react";
import { storage, db } from '../../firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setProgress, setImageUrl, setTitle, setDesc } from '../../services/slice/Announce'

export default function ImageUpload(props) {
    const dispatch = useDispatch()
    const { data, key, action, Desc, Title, imageUrl, progress } = useSelector((state) => state.announce)

    const [image, setImage] = useState(null);


    const handleChange = async e => {
        console.log("handleChange")
        if (props.inputFile.current.files[0]) {
            const file = props.inputFile.current.files[0]
            await setImage(file)
            await dispatch(setImageUrl(URL.createObjectURL(file)))
            props.setBtnDisabled(false)
        }
    }

    const saveFirestore = async (downloadURL) => {
        let objData = {
            name: image.name,
            imageUrl: downloadURL,
            createdAt: Date.now(),
            title: Title,
            desc: Desc
        }
        console.log("saveFirestore : ", objData)
        const docRef = await addDoc(collection(db, "announce"), objData);
        console.log("Document written with ID: ", docRef.id);
        props.clear()

    }

    const updateFirestore = async (downloadURL) => {
        let objData = {}
        if (downloadURL !== null) {
            objData = {
                name: image.name,
                imageUrl: downloadURL,
                title: Title,
                desc: Desc
            }

        } else {
            objData = {
                title: Title,
                desc: Desc
            }
        }

        console.log("updateFirestore : ", objData)
        await updateDoc(doc(db, "announce", key), objData);
        props.clear()
    }

    const handleUpdate = async () => {
        console.log("handleUpdate :", key)
        if (key) {
            if (image) {
                await props.DeleteImage(data[key].name)
                await handleUpload(updateFirestore)
            } else {
                await updateFirestore(null)
                console.log("handleUpdated")
            }
        }
    }



    const handleCreate = async (e) => {
        await handleUpload(saveFirestore)
    }


    const handleUpload = async (next) => {

        const storageRef = ref(storage, `announce/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on('state_changed',
            (snapshot) => {
                dispatch(setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
                console.log('Upload is ' + progress + '% done');
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
                    next(downloadURL);

                });

                console.log("completed")
            })
    }



    return (
        <div >
            <p>{progress}%</p>
            <progress value={progress} max="100" />
            <br />
            <input ref={props.inputTitle} type="text" value={Title} name="" id="" onChange={e => { dispatch(setTitle(e.target.value.trim())) }} />
            <textarea ref={props.inputDesc} name="" value={Desc} id="" cols="30" onChange={e => { dispatch(setDesc(e.target.value.trim())) }} rows="10"></textarea>
            <input ref={props.inputFile} type="file" onChange={handleChange} />
            <button onClick={props.clear}>cls</button>
            {
                action === 'ACTION_CREATE'
                    ? <button onClick={handleCreate} disabled={props.btnDisabled}>Upload</button>
                    : <button onClick={handleUpdate} >Update</button>
            }

            <br />
            <img src={imageUrl || 'http://via.placeholder.com/400x300'} alt="Uploaded images" />
        </div>
    )

}