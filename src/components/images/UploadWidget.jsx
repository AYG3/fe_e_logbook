import React, { useEffect, useRef } from 'react'
import { DiVim } from 'react-icons/di';

const UploadWidget = () => {

    const cloudinaryRef = useRef();
    const windowRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current)
        windowRef.current = cloudinaryRef.current.createUploadWidget({
          cloudName: 'dbf8kbius',
          uploadPreset: 'uufcw7ic'
        }, (error, result) =>{
          console.log(result)
        })
    }, [])
    return(
      <div>
        <button onClick={() => windowRef.current.open()}>
          Upload
        </button>
      </div>
    )
}

export default UploadWidget;
