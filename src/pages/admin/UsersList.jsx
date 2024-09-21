import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { formatDate } from '../../utils/dateTimeUtils';
import { Link } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import Modal from '../../components/Modal';
import ConfirmUserDelete from './ConfirmUserDelete';


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get(`/admin/users`);
        // console.log(res.data);

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [users]);

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUserId(null)
  }

  const openModal = (userId) => {
    setIsModalOpen(true)
    setSelectedUserId(userId)
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Started</th>
            <th className="py-2 px-4 border-b">Check</th>
            <th className="py-2 px-4 border-b">Operations</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((student, index) => (
            <tr key={student._id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{student.fname}</td>
              <td className="py-2 px-4 border-b">{student.lname}</td>
              <td className="py-2 px-4 border-b">{student.email}</td>
              <td className="py-2 px-4 border-b">{formatDate(student.createdAt)}</td>
              <td className='py-2 px-4 border-b'>
                <Link to={`/userslogbook/${student._id}`} > Check </Link>  
              </td>
              <td className='py-2 px-4 items-center border-b'>
                <button onClick={() => openModal(student._id)} className='inline-block p-2 rounded-full hover:bg-red-100' > 
                  <MdOutlineDelete className='text-red-600 text-xl' /> 
                </button>  
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onclose={closeModal}>
          <ConfirmUserDelete userId={selectedUserId} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UsersList;