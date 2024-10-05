import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import axiosInstance from "../utils/axiosConfig";
import { useParams } from "react-router-dom";

const AdminProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/logbook/userDetails/${id}`);
        console.log("API Response:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user in profile: ", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-6 shadow-lg max-w-md mx-auto mt-10">
      <div className="flex justify-center">
        <img
          src={`https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-white font-bold text-2xl">{user.fname + " " +  user.lname}</h2>
        <p className="text-white text-lg">{user.role || "User Role"}</p>
      </div>
      <div className="mt-6 text-white">
        <p><strong>Email:</strong> {user.email}</p>
        {/* <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <p><strong>Address:</strong> {user.address || "N/A"}</p> */}
      </div>
      <div className="flex justify-center mt-6">
        <button className="flex items-center bg-white text-blue-500 px-4 py-2 rounded-md shadow hover:bg-gray-100">
          <AiOutlineEdit className="mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;