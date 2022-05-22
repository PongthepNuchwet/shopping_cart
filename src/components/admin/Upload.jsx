import React from "react";
export default function Upload() {

    const handleChange = async e => {
        console.log("handleChange")
        if (props.inputFile.current.files[0]) {
            const file = props.inputFile.current.files[0]
            await setImage(file)
            await dispatch(setImageUrl(URL.createObjectURL(file)))
            props.setBtnDisabled(false)
        }
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

}