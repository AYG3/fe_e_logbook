import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton';

const ConfirmDeleteExtra = () => {
    const navigate = useNavigate();

    const confirm = () =>{
        navigate('/logbooks')
    }
  return (
    <div>
        <BackButton />
      Are you sure you want to delete this <br /> extra
      <button
      onClick={confirm}></button>
    </div>
  )
}

export default ConfirmDeleteExtra
