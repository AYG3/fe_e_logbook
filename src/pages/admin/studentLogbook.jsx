import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import Loading from '../../components/shared/Loading';

const StudentLogbook = () => {
  const [logbook, setLogbook] = useState(null);
  const { userId, userName } = useParams();
  const [weeks, setWeeks] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLogbook = async () => {
      const res = await axiosInstance.get(`admin/user/logbooks/${userId}`);
      setLogbook(res.data);
    };
    fetchUserLogbook();
  }, [userId]);

  useEffect(() => {
    let week_id = 1;
    const weeksArray = [];

    if (logbook) {
      logbook.forEach((entry, index) => {
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
  }, [logbook]);

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleScroll = (id) => {
    const week = document.getElementById(id);
    if (week) {
      week.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!logbook) {
    return (
      <div className=''>
        <Loading />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          User: {userName}
        </h1>
        <div className="relative">
          <button
            className="text-gray-300 hover:text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600"
            onClick={toggleDropdown}
          >
            Weeks
          </button>
          {dropDown && (
            <div className="absolute bg-gray-800 text-white mt-2 rounded-xl shadow-lg w-48 z-10">
              {weeks?.map((wk, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-left hover:bg-gray-700 w-full"
                  onClick={() => {
                    handleScroll(wk);
                    toggleDropdown();
                  }}
                >
                  Week {wk}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col p-4">
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
            {logbook?.map((entry, index) => {
              return (
                <React.Fragment key={entry._id}>
                  {index > 0 && index % 5 === 0 && (
                    <tr>
                      <td colSpan={4} className="border h-16 bg-slate-800 text-center rounded-md text-white font-bold"></td>
                    </tr>
                  )}
                  <tr id={Math.floor(index / 5) + 1}>
                    <td className="border border-slate-700 rounded-md text-center">
                      {index % 5 + 1}
                    </td>
                    <td className="flex-col border border-slate-700 rounded-md text-center">
                      <p>{entry.day}</p>
                      <p>{entry.date}</p>
                    </td>
                    <td className="border border-slate-700 rounded-md whitespace-pre-wrap pl-4">
                      {entry.nature_of_activities}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`/adminDetails/${entry._id}/${index}`}
                          className="text-2x1 text-green-800"
                        >
                          <BsInfoCircle />
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

export default StudentLogbook;