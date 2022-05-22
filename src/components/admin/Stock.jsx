import React, { useRef, useState } from "react";

import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { storage, db } from '../../firebase-config'
import { useSelector, useDispatch } from "react-redux";

import ProductTable from './StockTable'
import StockForm from "./StockForm";

export default function Stock() {

    const inputName = useRef()
    const inputDesc = useRef()
    const inputAmount = useRef()
    const inputImage = useRef()
    const inputPrice = useRef()

    const [Name, setName] = useState('')
    const [Desc, setDesc] = useState('')
    const [Amount, setAmount] = useState(0)
    const [Image, setImage] = useState(null)
    const [NameImage, setNameImage] = useState('')
    const [Price, setPrice] = useState(0)
    const [action, setAction] = useState("ACTION_CREATE")
    const [Key, setKey] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [imageUrl, setImageUrl] = useState(null)
    const [progress, setProgress] = useState(0)

    const data = useSelector((state) => state.products.data)



    const saveFirestore = async (downloadURL, newName) => {
        console.log("NameImage", NameImage)
        let objData = {
            name: Name,
            image: newName,
            imageUrl: downloadURL,
            desc: Desc,
            createdAt: Date.now(),
            amount: Number(Amount),
            price: Number(Price),
            inventory: Number(Amount)
        }
        console.log("saveFirestore : ", objData)
        const docRef = await addDoc(collection(db, "products"), objData);
        console.log("Document written with ID: ", docRef.id);
        clear()
    }

    const DeleteImage = async (imageName) => {
        let path = 'products/' + imageName
        console.log("DeleteImage ", path)
        deleteObject(ref(storage, path)).then(() => {
            console.log("File deleted successfully")
        }).catch((error) => {
            console.log(error)
        });
    }

    const updateFirestore = async (downloadURL, newName) => {
        let objData = {}
        if (downloadURL !== null) {
            objData = {
                image: newName,
                imageUrl: downloadURL,
                name: Name,
                desc: Desc,
                amount: Amount,
                price: Price
            }

        } else {
            objData = {
                name: Name,
                desc: Desc,
                amount: Amount,
                price: Price
            }
        }

        console.log("updateFirestore : ", objData)
        await updateDoc(doc(db, "products", Key), objData);
        clear()
    }



    const clear = () => {
        console.log("Clear")

        inputName.current.value = null;
        inputDesc.current.value = null;
        inputAmount.current.value = null;
        inputImage.current.value = null;
        inputPrice.current.value = null;

        setName('')
        setDesc('')
        setAmount(0)
        setPrice(0)
        setImage(null)
        setAction("ACTION_CREATE")
        setKey('')
        setBtnDisabled(true)
        setImageUrl(null)
        setNameImage('')
        setProgress(0)
    }

    return (
        <>
            <h3> Stock</h3>
            <StockForm
                inputName={inputName}
                inputDesc={inputDesc}
                inputAmount={inputAmount}
                inputImage={inputImage}
                inputPrice={inputPrice}
                setName={setName}
                setDesc={setDesc}
                setPrice={setPrice}
                setAmount={setAmount}
                setImage={setImage}
                Name={Name}
                Desc={Desc}
                Amount={Amount}
                Price={Price}
                action={action}
                btnDisabled={btnDisabled}
                saveFirestore={saveFirestore}
                Image={Image}
                setBtnDisabled={setBtnDisabled}
                clear={clear}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                progress={progress}
                setProgress={setProgress}
                updateFirestore={updateFirestore}
                Key={Key}
                data={data}
                setNameImage={setNameImage}
                DeleteImage={DeleteImage}
            />

            <ProductTable
                setName={setName}
                setDesc={setDesc}
                setPrice={setPrice}
                setAmount={setAmount}
                setImageUrl={setImageUrl}
                setKey={setKey}
                setAction={setAction}
                data={data}
                clear={clear}
                DeleteImage={DeleteImage}
            />
        </>
    )
}