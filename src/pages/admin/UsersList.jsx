import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const UsersList = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get(`/logbook/admin/users`);
        console.log(res.data);

        setUsers(res.data)

      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, [])

  return (
    <div>
      <div>
        USERS
      </div>
      {users?.map((student, index) => {
        <p key={student._id}>{student.fname}</p>
      })}
    </div>
  )
}

export default UsersList
