import React, { useState, useRef } from "react";
import ImageUpload from "./ImageUpload";
import AnnounceTable from "./AnnounceTable"
import { storage } from '../../firebase-config'
import { ref, deleteObject } from "firebase/storage";
import { useDispatch } from "react-redux";
import { reset } from '../../services/slice/Announce'

export default function Announce() {

    const dispatch = useDispatch()

    const [btnDisabled, setBtnDisabled] = useState(true)

    const inputFile = useRef();
    const inputTitle = useRef();
    const inputDesc = useRef();


    const DeleteImage = async (imageName) => {
        let path = 'announce/' + imageName
        console.log("DeleteImage ", path)

        deleteObject(ref(storage, path)).then(() => {
            console.log("File deleted successfully")
        }).catch((error) => {
            console.log(error)
        });
    }

    const clear = () => {
        inputFile.current.value = null;
        inputTitle.current.value = null;
        inputDesc.current.value = null;
        setBtnDisabled(true)
        dispatch(reset())
    }

    return (
        <>
            <h3> Announce</h3>
            <ImageUpload
                DeleteImage={DeleteImage}
                clear={clear}
                btnDisabled={btnDisabled}
                inputFile={inputFile}
                inputTitle={inputTitle}
                inputDesc={inputDesc}
                setBtnDisabled={setBtnDisabled} />
            <AnnounceTable
                DeleteImage={DeleteImage}
                clear={clear} />
        </>
    )
}