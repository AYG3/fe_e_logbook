import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosConfig'

const UsersList = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get(`/logbook/admin/users`);
        console.log(res.data);

        setUsers(res.data.data)

      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, [])

  // const getUsers = async () => {
  //   try {
  //     const res = await axiosInstance.get(`/logbook/admin/users`);
  //     console.log(res.data);

  //     console.log("data", res.data.fname)
  //     setUsers(res.data.data)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <div>
      <div>
        USERS
      </div>
      {users?.map((student) => {
        <p key={student._id}>{student.fname}</p>
      })}
      {/* <button onClick={getUsers}>GET USERS</button> */}
    </div>
  )
}

export default UsersList
