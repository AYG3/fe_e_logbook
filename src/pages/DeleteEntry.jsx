// import React from "react";
// import BackButton from "../components/BackButton";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const DeleteEntry = () => {
    
//     const { id } = useParams();
//     const navigate = useNavigate();
  

//   const handleDeleteEntry = async () => {

//     const token = localStorage.getItem('token');

//     try {
//       await axios.delete(`http://localhost:4444/logbook/deleteLogbook/${id}`, {
//         headers: {
//             Authorization: `Bearer: ${token}`
//         }
//       });
//       navigate("/logbooks");
//     } catch (error) {
//       console.log("Error deleting entry: ", error);
//     }
//   };
//   return (
//     <div className="p-4">
//       <BackButton />
//       <h1 className="text-3xl my-4">DeleteEntry</h1>
//       <div className="border-sky-400 rounded-xl w-[600px] p-8 flex flex-col items-center border-2">
//         <h3 className="text-2xl">
//           {" "}
//           Are you sure you want to delete this entry
//         </h3>
//         <button
//           className="p-4 bg-red-600 text-white m-8 w-full"
//           onClick={handleDeleteEntry}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteEntry;


import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const DeleteEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteEntry = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      await axios.delete(`http://localhost:4444/logbook/deleteLogbook/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/logbooks");
    } catch (error) {
      console.log("Error deleting entry: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Entry</h1>
      <div className="border-sky-400 rounded-xl w-[600px] p-8 flex flex-col items-center border-2">
        <h3 className="text-2xl mb-4">
          Are you sure you want to delete this entry?
        </h3>
        {showConfirmation ? (
          <>
            <button
              className="p-4 bg-red-600 text-white m-2 w-full"
              onClick={handleDeleteEntry}
            >
              Confirm Delete
            </button>
            <button
              className="p-4 bg-gray-600 text-white m-2 w-full"
              onClick={handleCancelDelete}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        )}
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default DeleteEntry;