import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { Link, useParams } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Loading from '../../components/shared/Loading';

const StudentLogbook = () => {
  const [logbook, setLogbook] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserLogbook = async () => {
      const res = await axiosInstance.get(`admin/user/logbooks/${userId}`);
      console.log(res.data);
      setLogbook(res.data);
    };
    fetchUserLogbook();
  }, [userId]);

  if (!logbook) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex flex-col">
        <table className="w-full border border-separate border-spacing-2 table-auto">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Day</th>
              <th className="border border-slate-600 rounded-md">Nature of Activities</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {logbook?.map((entry, index) => (
              <tr key={index}>
                <td className="border border-slate-600 rounded-md">{index + 1}</td>
                <td className="border border-slate-600 rounded-md">{entry.day}</td>
                <td className="border border-slate-600 rounded-md">{entry.activities}</td>
                <td className="border border-slate-600 rounded-md flex justify-around">
                  <Link to={`/logbook/${entry.id}/info`} className="text-blue-500 hover:text-blue-700">
                    <BsInfoCircle size={20} />
                  </Link>
                  <Link to={`/logbook/${entry.id}/edit`} className="text-green-500 hover:text-green-700">
                    <AiOutlineEdit size={20} />
                  </Link>
                  <button className="text-red-500 hover:text-red-700">
                    <MdOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLogbook;