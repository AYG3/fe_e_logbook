import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import DeleteModal from "../components/Modals/DeleteModal";

const DeleteEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteEntry = async () => {

    try {
      await axiosInstance.delete(`/logbook/deleteLogbook/${id}`);
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

      {isModalOpen && ( <DeleteModal   />
      )}
    </div>
  );
};

export default DeleteEntry;