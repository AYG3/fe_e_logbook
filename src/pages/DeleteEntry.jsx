import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const DeleteEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteEntry = async () => {
    const token = localStorage.getItem("token");

    try {
      await axiosInstance.delete(`/logbook/deleteLogbook/${id}`, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });
      navigate("/logbooks");
    } catch (error) {
      console.log("Error deleting entry: ", error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Entry</h1>
      <div className="border-sky-400 rounded-xl w-[600px] p-8 flex flex-col items-center border-2">
        <h3 className="text-2xl">
          Are you sure you want to delete this entry?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-2xl mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this entry?</p>
            <div className="flex justify-end gap-4">
              <button
                className="p-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-red-600 text-white rounded"
                onClick={handleDeleteEntry}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteEntry;