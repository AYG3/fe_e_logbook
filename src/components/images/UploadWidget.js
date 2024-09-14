import React, { useEffect, useRef } from 'react'

const UploadWidget = () => {

    const cloudinaryRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default UploadWidget;
