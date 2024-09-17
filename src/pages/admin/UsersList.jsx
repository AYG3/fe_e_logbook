import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const UsersList = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get(`auth/admin/users`);
        console.log(res);

      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, [])
  return (
    <div>
      Users List
    </div>
  )
}

export default UsersList
