import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const DetailsEntry = () => {
  const [entry, setEntry] = useState(null);
  const [extra, setExtra] = useState('');
  const [extraText, setExtraText] = useState('')
  const { entryId } = useParams();

  const [day, setDay] = useState('');
  const [nature_of_activities, setNAtureOfActivities] = useState('');
  const [date, setDate] = useState('');


  

  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("token");


      try {
        const res = await axios.get(
          `http://localhost:4444/logbook/userLogbook/${entryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
        setEntry(res.data);
        setExtra(res.data.extra)
        setDate(res.data.date)
        setNAtureOfActivities(res.data.nature_of_activities)
        setDay(res.data.day)
        
      } catch (error) {
        console.log("Error Fetching entry: ", error);
      }
    };

    fetchEntry();
  }, [entryId]);

  const handleExtraText = (e) => {
    setExtra((prevExtra) => 
        [...prevExtra, extraText],
    )     
}

  const handleExtra = async () => {
    try {
      const data = {
        day,
        nature_of_activities,
        date,
        extra,
      };
      const token = localStorage.getItem("token");
      console.log('entryId: ', entryId)

      const res = await axios.put(
        `http://localhost:4444/logbook/editLogbook/${entryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.status !== 200){
            console.log('Error updating extra: ', res.data)
        } else {
            console.log('Succesfully updated extra')
        }

    } catch (error) {
        console.log("Error handling extra: ", error)
    }
  };

  const handleEditExtra = (e) => {
    setTextArea(e.target.value)
  }

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <BackButton />
      <table className="w-full border border-separate border-spacing-2 table-auto ">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Day</th>
            <th className="border border-slate-600 rounded-md">
              Nature of Activities
            </th>
            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr key={entry.id}>
            <td className="border border-slate-700 rounded-md text-center">
              {entry.id}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {entry.day}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {entry.nature_of_activities}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center space-x-12">
                <Link
                  to={`/edit/${entry._id}`}
                  className="text-2x1 text-yellow-600"
                >
                  <AiOutlineEdit />
                </Link>
                <Link
                  to={`/delete/${entry._id}`}
                  className="text-2x1 text-red-600"
                >
                  <MdOutlineDelete />
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border border-black my-6 flex flex-col items-center space-y-8 p-6 rounded-lg shadow-lg bg-white">
        <label className="text-3xl font-semibold text-slate-700">Extra</label>

        {extra && extra.length > 0 && (
          <div className="border border-slate-300 w-full md:w-2/3 outline-none space-y-4 p-4 rounded-xl bg-gray-50">
            {extra?.map((line, index) => (
              <div
                key={index}
                className="whitespace-pre-wrap flex justify-between items-center p-2 bg-white rounded-md shadow-sm"
              >
                <p className="my-4 text-slate-600">{line}</p>
                <div className="space-x-4 flex ">
                  <button className="py-1 px-3 rounded-sm bg-yellow-100 hover:bg-yellow-200">
                    <AiOutlineEdit
                    onClick={(e)=>handleEditExtra(e)}
                    className="text-yellow-500" />
                  </button>
                  <button className="py-1 px-3 rounded-sm bg-red-100 hover:bg-red-200">
                    <MdOutlineDelete className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <textarea
          name="extra"
          rows="3"
            onChange={(e) => setExtraText(e.target.value)}
          className=" border-2 border-slate-300 w-full md:w-2/3 outline-none p-2 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter extra info here"
        ></textarea>

        <button
          type="submit"
          onClick={handleExtraText}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>

        <button
          type="submit"
          onClick={handleExtra}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Server Update
        </button>

        {/* ACCEPT THE IMAGES */}
        <input
          type="file"
          accept="image/"
          name="images"
          //   onChange={convertToBase64}
          multiple
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default DetailsEntry;
