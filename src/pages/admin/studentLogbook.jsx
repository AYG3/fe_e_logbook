import React, { useEffect, useState } from "react";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/shared/Loading.jsx"
import axiosInstance from "../../utils/axiosConfig";
import DeleteModal from "../../components/Modals/DeleteModal";
import { handleDeleteEntry } from "../../api/user";

const StudentLogbook = () => {
  const [entries, setEntries] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const {userId} = useParams();

  const openDeleteModal = (entryId) => {
    setSelectedEntryId(entryId);
    setIsDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setSelectedEntryId(null);
    setIsDeleteModalOpen(false);
  };
  
  const handleDelete = async () => {
    await handleDeleteEntry(selectedEntryId, navigate);
    closeDeleteModal();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get(`/auth/user/${userId}`);
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserData();  
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axiosInstance.get(`/admin/user/logbooks/${userId}`);
        setEntries(res.data);
      } catch (error) {
        console.log("Error getting entries: ", error);
      }
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    let week_id = 1;
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

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleScroll = (id) => {
    const week = document.getElementById(id);
    if (week) {
      week.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!entries) {
    return <Loading className='absolute' />;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center p-4">
        <div className="flex justify-end">
          <Link to="/create" className="text-3xl my-8">
            <MdOutlineAddBox className="text-4xl text-sky-800 dark:text-sky-400" />
          </Link>
        </div>
        <div className="relative">
          <button
            className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 px-4 py-2 rounded-md bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 border border-gray-600 dark:border-gray-700"
            onClick={toggleDropdown}
          >
            Weeks
          </button>
          {dropDown && (
            <div className="absolute bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 mt-2 rounded-xl shadow-lg w-48 z-10">
              {weeks?.map((wk, index) => (
                <button
                  key={index}
                  className="block px-4 py-2 text-left hover:bg-gray-700 dark:hover:bg-gray-800 w-full"
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
        <table className="w-full border border-separate border-spacing-2 table-auto">
          <thead>
            <tr>
              <th className="border border-slate-600 dark:border-slate-700 rounded-md">No</th>
              <th className="border border-slate-600 dark:border-slate-700 rounded-md">Day</th>
              <th className="border border-slate-600 dark:border-slate-700 rounded-md w-max">
                Nature of Activities
              </th>
              <th className="border border-slate-600 dark:border-slate-700 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {entries?.map((entry, index) => {
              return (
                <React.Fragment key={entry._id}>
                  {index > 0 && index % 5 === 0 && (
                    <tr>
                      <td colSpan={4} className="border h-16 bg-slate-800 dark:bg-slate-900 text-center rounded-md text-white dark:text-gray-200 font-bold"></td>
                    </tr>
                  )}
                  <tr id={Math.floor(index / 5) + 1}>
                    <td className="border border-slate-700 dark:border-slate-800 rounded-md text-center">
                      {index % 5 + 1}
                    </td>
                    <td className="border border-slate-700 dark:border-slate-800 rounded-md text-center">
                      {entry.day}
                      <br />
                      {entry.date}
                    </td>
                    <td className="border border-slate-700 dark:border-slate-800 rounded-md whitespace-pre-wrap max-w-fit pl-4">
                      {entry.nature_of_activities}
                    </td>
                    <td className="border border-slate-700 dark:border-slate-800 rounded-md text-center">
                      <div className="flex justify-center gap-4">
                        <Link to={`/details/${entry._id}/${index}`} className="text-2x1 text-green-800 dark:text-green-400">
                          <BsInfoCircle />
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDelete}
                    day={entry.day + " " + entry.date}
                  />
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