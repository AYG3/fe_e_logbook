import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import { handleCreateEntry } from '../api/user.js';


const CreateEntry = () => {

    const [day, setDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long'}));
    const [nature_of_activities, setNAtureOfActivities] = useState();
    const [date, setDate] = useState(new Date().toLocaleDateString());
    
    const navigate = useNavigate();

    

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
          onClick={()=>handleCreateEntry(day, nature_of_activities, date, navigate)}
          className="p-2 bg-sky-700 m-8 text-white"
        >
          Create
        </button>
      </div>

    </div>
  )
}

export default CreateEntry
