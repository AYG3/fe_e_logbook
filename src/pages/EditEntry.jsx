import axios from "axios";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

const EditEntry = () => {
  const [day, setDay] = useState();
  const [nature_of_activities, setNAtureOfActivities] = useState();
  const [date, setDate] = useState();
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token:", token);

        const response = await axios.get(
          `http://localhost:4444/logbook/userLogbook/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        console.log("Response data: ", response.data);
        setDay(response.data.day);
        setNAtureOfActivities(response.data.nature_of_activities);
        setDate(response.data.date);

      } catch (error) {
        console.log(`Error fetching entry: ${error}`);
      }
    };

    fetchEntry();
  }, [id]);

  const handleEditEntry = async () => {
    try {
        const data = {
            day,
            nature_of_activities,
            date
        }

        const token = localStorage.getItem('token')
        console.log('Put request token', token);

        const res = await axios.put(`http://localhost:4444/logbook/editLogbook/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data)

        navigate('/logbooks')

    } catch (error) {
        console.log('Error updating entry', error)
    }
  };

  return (
    <div>
      <BackButton />
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 ">Day</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 ">Nature of Activities</label>
          <textarea
            // ref = {textareaR}
            value={nature_of_activities}
            onChange={(e) => setNAtureOfActivities(e.target.value)}
            required
            className="border-2 border-gray-500 px-4 py-2 w-full overflow-hidden"
            rows="1"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 ">Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button
          onClick={handleEditEntry}
          className="p-2 bg-sky-700 m-8 text-white"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditEntry;
