import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'
import { useParams } from 'react-router-dom'

const StudentLogbook = () => {
    const [logbook, setLogbook] = useState();
    const { userId } = useParams();

    useEffect(() => {
      const fetchUserLogbook = async () => {
        const res = await axiosInstance.get(`/admin/user/logbooks/${userId}`);
        
        console.log(res.data);

        setLogbook(res.data)
      }

      fetchUserLogbook();
    }, [])
  return (
    <div className='container'>
      <h1>Logbook</h1>
      
      <div>
        {logbook?.map((logbook) => (
          <div key={logbook._id}>
            {logbook.day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentLogbook
