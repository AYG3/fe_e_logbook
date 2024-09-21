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
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Users</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 border-b font-semibold">ID</th>
            <th className="py-3 px-4 border-b font-semibold">First Name</th>
            <th className="py-3 px-4 border-b font-semibold">Last Name</th>
            <th className="py-3 px-4 border-b font-semibold">Email</th>
            <th className="py-3 px-4 border-b font-semibold">Started</th>
            <th className="py-3 px-4 border-b font-semibold">Check</th>
            <th className="py-3 px-4 border-b font-semibold">Operations</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((student, index) => (
            <tr key={student._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b text-center">{index + 1}</td>
              <td className="py-3 px-4 border-b text-center">{student.fname}</td>
              <td className="py-3 px-4 border-b text-center">{student.lname}</td>
              <td className="py-3 px-4 border-b text-center">{student.email}</td>
              <td className="py-3 px-4 border-b text-center">{formatDate(student.createdAt)}</td>
              <td className="py-3 px-4 border-b text-center">
                <Link to={`/userslogbook/${student._id}/${student.fname + " " + student.lname}`} className="text-blue-600 hover:underline">
                  Check
                </Link>
              </td>
              <td className="py-3 px-4 border-b text-center">
                <button onClick={() => openModal(student._id)} className="inline-block p-2 rounded-full hover:bg-red-100">
                  <MdOutlineDelete className="text-red-600 text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ConfirmUserDelete userId={selectedUserId} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UsersList;