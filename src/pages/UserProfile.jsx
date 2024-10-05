import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
////import AdminAuthContext from "../context/admin/AdminAuthContext";
import axiosInstance from "../utils/axiosConfig";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  // const {isAdmin } = useContext(AdminAuthContext);

  const { id } = useParams();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/logbook/userDetails/${id}`);
        console.log("Id: ", id);
        console.log("Res data email: ", res.data);
        setUser(res.data);

        console.log(id);
      } catch (error) {
        console.error("Error fetching user  in profile: ", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg p-4">
      <div className="flex justify-center">
        <img
          src="your-profile-image.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-white font-bold text-2xl">Hembo Tingor</h2>
        <p className="text-white text-lg">Web Designer</p>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-white font-bold text-lg">Contact Information</h3>
        <ul className="text-white mt-2">
          <li>Email: rntng@gmail.com</li>
          <li>Phone: 98979989898</li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-white font-bold text-lg">Projects</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-bold text-lg">Recent</h4>
            <ul className="text-white mt-2">
              <li>Sam Disuja</li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-bold text-lg">Most Viewed</h4>
            <ul className="text-white mt-2">
              <li>Dinoter husainm</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
