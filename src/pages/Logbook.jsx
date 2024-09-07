import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Logbook = () => {
  const [entries, setEntries] = useState();
  // const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log("token: ", token);
        console.log("userId: ", userId);

        const res = await axios.get(
          `http://localhost:4444/auth/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // setUser(res.data);
        console.log("User data: ", res.data);
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const res = await axios.get(
          `http://localhost:4444/logbook/userLogbooks/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEntries(res.data);
        console.log("setEntries: ", res.data);
      } catch (error) {
        console.log("Error getting entries: ", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="overflow-x-auto ">

      <div className=" flex flex-col  p-4">
        <h1 className="text-3xl"> E-logbook</h1>
        <div className="flex justify-end">
          <Link to="/create" className="text-3xl my-8 ">
            <MdOutlineAddBox className="text-4xl text-sky-800 " />
          </Link>
        </div>

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
            {entries?.map((entry, index) => {
              return (
                <tr key={entry._id}>
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="flex items-center flex-col border border-slate-700 rounded-md text-center">
                    <p>{entry.day}</p>
                    <p>{entry.date}</p>
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {entry.nature_of_activities}
                  </td>

                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-4">
                      <Link to={`/details/${entry._id}`} className="text-2x1 text-green-800">
                        <BsInfoCircle />
                      </Link>
                      <Link to={`/edit/${entry._id}`} className="text-2x1 text-yellow-600">
                        <AiOutlineEdit />
                      </Link>
                      <Link to={`/delete/${entry._id}`} className="text-2x1 text-red-600">
                        <MdOutlineDelete />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logbook;
