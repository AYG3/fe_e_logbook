import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';

const ConfirmUserDelete = () => {
  const { userId } = useParams();
  const [ student, setStudent ] = useState("");

  useEffect(() => {
    const fetchStudent = async () =>{
      const res = await axiosInstance.get(`/admin/getUser/${userId}`);
      setStudent(res.data)
    }
    fetchStudent();
    console.log(student);

  }, []);

  return (
    <div>
      <p>
        {student.fname}
        {student.lname}
      </p>

      CONFIRM USER DELETE

    </div>
  )
}

export default ConfirmUserDelete;