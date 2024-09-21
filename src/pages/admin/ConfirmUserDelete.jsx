import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig';

const ConfirmUserDelete = (userId, onClose) => {
  const [ student, setStudent ] = useState("");

  useEffect(() => {
    const fetchStudent = async () =>{
      const res = await axiosInstance.get(`/admin/getUser/${userId}`);
      setStudent(res.data)
    }
    fetchStudent();
    console.log(student);

  }, [userId]);

  const handleDelete = async () => {
    try {
      const res = axiosInstance.delete(`/admin/userDelete/${userId}`)
      onClose();
      //Add snackbar success message
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Confirm User Delete</h2>
      <p className="mb-4">
        Are you sure you want to delete the user <strong>{student.fname} {student.lname}</strong>?
      </p>
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
          Cancel
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  )
}

export default ConfirmUserDelete;