import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

const DetailsEntry = () => {
  const [entry, setEntry] = useState(null);
  const [extra, setExtra] = useState();
  const { id } = useParams();
  

  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `http://localhost:4444/logbook/userLogbook/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);
        setEntry(res.data);
      } catch (error) {
        console.log("Error Fetching entry: ", error);
      }
    };

    fetchEntry();
  }, [id]);

  const handleExtra = async () => {
    try {
        const res = await axios.post(`http://localhost:4444/logbook/userLogbook/${id}`)
    } catch (error) {
        
    }
  }



  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
              <div key={index} className="whitespace-pre-wrap flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <p className="my-4 text-slate-600">{line}</p>
                <div className="space-x-4 flex ">
                  <button
                    className="py-1 px-3 rounded-sm bg-yellow-100 hover:bg-yellow-200"
                    // onClick={() => handleEdit(index)}
                  >
                    <AiOutlineEdit className="text-yellow-500" />
                  </button>

                  <button
                    className="py-1 px-3 rounded-sm bg-red-100 hover:bg-red-200"
                    // onClick={() => handleDelete(index)}
                  >
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
        //   value={extraText}
        //   onChange={(e) => setExtraText(e.target.value)}
          className=" border-2 border-slate-300 w-full md:w-2/3 outline-none p-2 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter extra info here"
        ></textarea>

        <button
          type="submit"
        //   onClick={() => handleExtra(editIndex)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
           Update
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
