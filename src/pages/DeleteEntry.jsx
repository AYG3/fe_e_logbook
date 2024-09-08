import React from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteEntry = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:4444/logbook/deleteLogbook/${id}`, {
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
      <h1 className="text-3xl my-4">DeleteEntry</h1>
      <div className="border-sky-400 rounded-xl w-[600px] p-8 flex flex-col items-center border-2">
        <h3 className="text-2xl">
          {" "}
          Are you sure you want to delete this entry
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteEntry}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteEntry;
