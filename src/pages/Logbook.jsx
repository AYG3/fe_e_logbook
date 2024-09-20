import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loading from "../components/shared/Loading";
import axiosInstance from "../utils/axiosConfig";

const Logbook = () => {
  const [entries, setEntries] = useState(null);
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId")

        // console.log("token: ", token);
        // console.log("userId: ", userId);

        const res = await axiosInstance.get(`/auth/user/${userId}`);

        // setUser(res.data);
        // console.log("User data: ", res.data);
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

        const res = await axiosInstance.get(`/logbook/userLogbooks/${userId}`);

        setEntries(res.data);
        // console.log("setEntries: ", res.data);
      } catch (error) {
        console.log("Error getting entries: ", error);
      }
    };

    fetchEntries();
  }, []);

  let week_id = 1;
  // const weeks = [];

  // useEffect(() => {
  //   localStorage.setItem(('weeks'), JSON.stringify(weeks));
  // }, [weeks])

  useEffect(() => {
     week_id = 1;
     const weeksArray = [];

    if (entries) {
      entries.forEach((entry, index) => {
        if (index > 0 && index % 5 === 0) {
          week_id++;
        }
        if (!weeksArray.includes(week_id)) {
          weeksArray.push(week_id);
        }
      });

      setWeeks(weeksArray);
      localStorage.setItem("weeks", JSON.stringify(weeksArray));
    }
  }, [entries]);


  if (!entries){
    return <Loading  className='absolute'/>
  }

  return (
    <div className="overflow-x-auto ">
      <div className=" flex flex-col  p-4">
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
              if (index > 0 && index % 5 == 0){
                week_id++
              }
              if(!weeks.includes(week_id)) {
                weeks.push(week_id);
              }
              return (
              <React.Fragment key={entry._id}>
                {index> 0 && index % 5 == 0 && (<tr><td colSpan={4} className="border h-16 bg-slate-800 text-center rounded-md text-white font-bold"></td></tr>)}
                  <tr id={week_id}>
                    {/* <tr>Week {week_id}</tr> */}
                    <td className="border border-slate-700 rounded-md text-center">
                      {index % 5 + 1} 
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      {entry.day}<br/>
                      {entry.date}
                    </td>
                    <td className="border border-slate-700 rounded-md whitespace-pre-wrap pl-4">
                      {entry.nature_of_activities}
                    </td>
  
                    <td className="border border-slate-700 rounded-md text-center">
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`/details/${entry._id}`}
                          className="text-2x1 text-green-800"
                        >
                          <BsInfoCircle />
                        </Link>
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
              </React.Fragment>
              );
              
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logbook;
