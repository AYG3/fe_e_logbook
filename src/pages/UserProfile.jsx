import React, { useEffect, useState} from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
////import AdminAuthContext from "../context/admin/AdminAuthContext";
import axiosInstance from "../utils/axiosConfig";
import { useParams } from 'react-router-dom';


const UserProfile = () => {
    // const {isAdmin } = useContext(AdminAuthContext);

    const { id } = useParams();

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
              const res = await axiosInstance.get(`/logbook/userDetails/${id}`);  
              console.log("Id: ", id);
              console.log("Res data email: ", res.data)
              setUser(res.data)
              
              console.log(id);
            } catch (error) {
              console.error("Error fetching user  in profile: ", error);           
            }   
        }

        fetchUser();
    }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full shadow-md"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h2 className="mt-4 text-3xl font-semibold text-gray-800">{user.fname} {user.lname}</h2>
          <p className="mt-2 text-gray-600 text-center">
            A passionate developer with a love for creating amazing web applications.
          </p>
        </div>
        <div className="mt-6 w-full">
          <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          <div className="mt-4">
            <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {user.email}</p>
          </div>
        </div>
        <div className="mt-6 w-full">
          <h3 className="text-xl font-semibold text-gray-800">Social Links</h3>
          <div className="mt-4 flex justify-around">
            <a
              href="https://twitter.com"
              className="text-blue-500 hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              className="text-blue-700 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              className="text-gray-800 hover:text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <AiOutlineEdit className="text-xl" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;