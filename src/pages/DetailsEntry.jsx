import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loading from "../components/shared/Loading";
import axiosInstance from "../utils/axiosConfig";
import UploadWidget from "../components/images/UploadWidget";
import { handleExtra, handleEditExtra, handleDeleteExtra, handleDeleteEntry } from "../api/user";
import { handleAdminForm, handleApprovalChange, handleCommentChange } from "../api/admin.js";
import AdminAuthContext from "../context/admin/AdminAuthContext";
import DeleteModal from "../components/Modals/DeleteModal.jsx";

const DetailsEntry = () => {
  const [entry, setEntry] = useState(null);
  const [extra, setExtra] = useState(['']);
  const [textArea, setTextArea] = useState("");
  const { entryId, rIndex } = useParams();
  const [editIndex, setEditIndex] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const [day, setDay] = useState("");
  const [nature_of_activities, setNAtureOfActivities] = useState("");
  const [date, setDate] = useState("");

  const { isAdmin } = useContext(AdminAuthContext);
  const [approval, setApproval] = useState('');
  const [comment, setComment] = useState([''])
  const [editComment, setEditComment] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //Fetches initial entry
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axiosInstance.get(`/logbook/userLogbook/${entryId}`);
        setEntry(res.data);
        setExtra(res.data.extra);
        setDay(res.data.day);
        setNAtureOfActivities(res.data.nature_of_activities);
        setDate(res.data.date);
        setComment(res.data.comment)
        setApproval(res.data.approval)
        console.log("isDeleteModalOpen: ", isDeleteModalOpen);
      } catch (error) {
        console.log("Error Fetching entry: ", error);
      }
    };

    fetchEntry();
  }, [entryId, token, isDeleteModalOpen]);



  if (!entry) {
    return (
      <div>
        <Loading />
      </div>
    );
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
              {rIndex}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {entry.day}<br />
              {entry.date}
            </td>
            <td className="border border-slate-700 rounded-md whitespace-pre-wrap pl-4">
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
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="text-2x1 text-red-600"
                >
                  <MdOutlineDelete />
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border border-black my-6 flex flex-col items-center space-y-8 p-6 rounded-lg shadow-lg bg-white  text-black">
        <label className="text-3xl font-semibold text-black">Details</label>

        {extra && extra.length > 0 && (
          <div className="border border-slate-800 w-full md:w-2/3 outline-none space-y-4 p-4 rounded-xl bg-slate-300">
            {extra?.map((line, index) => (
              <div
                key={index}
                className="whitespace-pre-wrap flex justify-between items-center p-2 bg-white rounded-md shadow-sm"
              >
                <p className="my-4 text-black">{line}</p>
                <div className="space-x-4 flex ">
                  <button className="py-1 px-3 rounded-sm bg-yellow-100 hover:bg-yellow-200">
                    <AiOutlineEdit
                      onClick={() => handleEditExtra(index, extra, setEditIndex, setTextArea)}
                      className="text-yellow-500"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteExtra(index, extra, setExtra, day, nature_of_activities, date, entryId)}
                    className="py-1 px-3 rounded-sm bg-red-100 hover:bg-red-200"
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
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          className=" border-2 border-slate-300 w-full md:w-2/3 outline-none p-2 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter extra info here"
        ></textarea>

        <button
          type="submit"
          onClick={() => handleExtra(extra, textArea, setExtra, setTextArea, day, nature_of_activities, date, entryId, editIndex, setEditIndex)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>

        {/* ACCEPT THE IMAGES */}
        {/* <div className="bg-black"> */}
        {/* <UploadWidget className='bg-white ' /> */}

        {/* </div> */}

       {/* ADMIN'S SECTION */}

{isAdmin ? (
  <form className="flex flex-col space-y-4 border border-red-800 p-4 rounded-md shadow-md bg-gray-50 w-full md:w-2/3" onSubmit={(e) => handleAdminForm(e, approval, comment, entryId)}>
    <div className="flex items-center space-x-2">
      <input type="radio" name="approval" value='approved' className="form-radio text-blue-600" checked={approval === 'approved'} onChange={(e)=>handleApprovalChange(e, setApproval, entryId, comment)} />
      <label htmlFor="approved" className="text-gray-700">Approved</label>
    </div>
    <div className="flex items-center space-x-2">
      <input type="radio" name="approval" value="semi-approved" className="form-radio text-yellow-600" checked={approval === 'semi-approved'} onChange={(e)=>handleApprovalChange(e, setApproval, entryId, comment)} />
      <label htmlFor="semi-approved" className="text-gray-700">Semi-approved</label>
    </div>
    <div className="flex items-center space-x-2">
      <input type="radio" name="approval" value="not-approved" className="form-radio text-red-600" checked={approval === 'not-approved'} onChange={(e)=>handleApprovalChange(e, setApproval, entryId, comment)} />
      <label htmlFor="not-approved" className="text-gray-700">Not approved</label>
    </div>
    <textarea
      className="border border-slate-800 p-2 rounded-md w-full bg-white"
      onChange={(e)=>{handleCommentChange(e, setComment); setEditComment(true)}}
      value={comment}
      placeholder="Supervisor's comment"
    ></textarea>
    <button
      type="submit"
      onClick={()=>setEditComment(false)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      {editComment ? 'Update': 'Comment'}
    </button>
  </form>
) : (
  <form className="flex flex-col space-y-4 border border-red-800 p-4 rounded-md shadow-md bg-gray-50 w-full md:w-2/3">
    <div className="flex items-center space-x-2">
      <input type="radio" name="approval" value='approved' className="form-radio text-blue-600" checked={approval === 'approved'} disabled />
      <label htmlFor="approved" className="text-gray-700">Approved</label>
    </div>
    <div className="flex items-center space-x-2">
      <input type="radio" name="approval" value="semi-approved" className="form-radio text-yellow-600" checked={approval === 'semi-approved'} disabled />
      <label htmlFor="semi-approved" className="text-gray-700">Semi-approved</label>
    </div>
    <div className="flex items-center space-x-2">
      <input type="radio" name="approval" value="not-approved" className="form-radio text-red-600" checked={approval === 'not-approved'} disabled />
      <label htmlFor="not-approved" className="text-gray-700">Not approved</label>
    </div>
    <textarea
      className="border border-slate-800 p-2 rounded-md w-full bg-white"
      value={comment}
      placeholder="Supervisor's comment"
      disabled
    ></textarea>
    <button
      type="button"
      className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-50"
      disabled
    >
      {editComment ? 'Update': 'Comment'}
    </button>
  </form>
)}
      </div>
      {isDeleteModalOpen && ( <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={()=>handleDeleteEntry(entryId, navigate)}/> )}
    </div>
  );
};

export default DetailsEntry;
