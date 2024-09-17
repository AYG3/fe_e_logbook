import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { formatDate } from '../../utils/dateTimeUtils';
import { Link } from 'react-router-dom';
const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get(`/logbook/admin/users`);
        // console.log(res.data);

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Started</th>
            <th className="py-2 px-4 border-b">Check</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((student) => (
            <tr key={student._id}>
              <td className="py-2 px-4 border-b">{student._id}</td>
              <td className="py-2 px-4 border-b">{student.fname}</td>
              <td className="py-2 px-4 border-b">{student.lname}</td>
              <td className="py-2 px-4 border-b">{formatDate(student.createdAt)}</td>
              <td className='py-2 px-4 border-b'>
                <Link to={`/userslogbook/${student._id}`} > Check </Link>  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;