import React, { useEffect, useRef } from 'react'
import { DiVim } from 'react-icons/di';

const UploadWidget = () => {

    const cloudinaryRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current)
        cloudinaryRef.current.createUploadWidget({
          cloudName: 'dbf8kbius',
          uploadPreset: 'uufcw7ic'
        }, (error, result) =>{
          console.log(result)
        })
    }, [])
    return(
      <div>
        
      </div>
    )
}

export default UploadWidget;
