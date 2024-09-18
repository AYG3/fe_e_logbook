import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link, useAsyncValue, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loading from "../components/shared/Loading";
import axiosInstance from "../utils/axiosConfig";
import UploadWidget from "../components/images/UploadWidget";
import { handleExtra, handleEditExtra, handleDeleteExtra } from "../api/user";
// import UserAuthContext from "../context/user/UserAuthContext";
import AdminAuthContext from "../context/admin/AdminAuthContext";
import { comment } from "postcss";

const DetailsEntry = () => {
  const [entry, setEntry] = useState(null);
  const [extra, setExtra] = useState(['']);
  const [textArea, setTextArea] = useState("");
  const { entryId } = useParams();
  const [editIndex, setEditIndex] = useState(null);
  const token = localStorage.getItem("token");
  
  const [day, setDay] = useState("");
  const [nature_of_activities, setNAtureOfActivities] = useState("");
  const [date, setDate] = useState("");

  const { isAdmin } = useContext(AdminAuthContext);
  const [approval, setApproval] = useState('');
  const [comment, setComment] = useState([''])
  
  //Fetches initial entry
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axiosInstance.get(`/logbook/userLogbook/${entryId}`);

        // console.log("Response data: ", res.data);
        setEntry(res.data);
        setExtra(res.data.extra);
        setDay(res.data.day);
        setNAtureOfActivities(res.data.nature_of_activities);
        setDate(res.data.date);
        console.log('isAdmin: ', isAdmin);
        console.log("EntryId: ", entryId);
      } catch (error) {
        console.log("Error Fetching entry: ", error);
      }
    };

    fetchEntry();
  }, [entryId, token]);



  if (!entry) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleAdminForm = async (e) => {
    e.preventDefault();

    try {
      console.log("Handling Form (Try block)");
      
      const commentData = {
        approval: approval,
        comment: comment,
      }
      const res = axiosInstance.put(`/logbook/admin/addComment/${entryId}`, commentData);
      
      if(res==200){
        console.log("Comment Succesful");
        console.log("Response data: ", res);
      }

    } catch (error) {
      console.log("handleAdminForm Error: ", error);
    }
  }

  const handleApprovalChange = (e) =>{
    setApproval(e.target.value);
  } 

  const handleCommentChange = (e) =>{
    setComment(e.target.value);
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
              {entry.date}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {entry.day}
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
        <input
          type="file"
          accept="image/"
          name="images"
          multiple
          className="mt-4"
        />

        <UploadWidget className='bg-black' />

        {/* ADMIN'S SECTION */}

        {isAdmin ? (
          <form className="flex flex-col space-y-4 border border-red-800 p-4 rounded-md shadow-md bg-gray-50 w-full md:w-2/3" onSubmit={handleAdminForm}>
            <div className="flex items-center space-x-2">
              <input type="radio" name="approval" value='approved' className="form-radio" checked={approval=='approved'} onChange={(e)=>handleApprovalChange(e)}/>
              <label htmlFor="approved" className="text-gray-700">Approved</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" name="approval" value="semi-approved" className="form-radio" checked={approval=='semi-approved'} onChange={(e)=>handleApprovalChange(e)}/>
              <label htmlFor="semi-approved" className="text-gray-700">Semi-approved</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" name="approval" value="not-approved" className="form-radio" checked={approval=='not-approved'} onChange={(e)=>handleApprovalChange(e)} />
              <label htmlFor="not-approved" className="text-gray-700">Not approved</label>
            </div>
            <textarea
              className="border border-slate-800 p-2 rounded-md w-full bg-white"
              onChange={(e)=>handleCommentChange(e)}
              placeholder="Supervisor's comment"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Comment
            </button>
          </form>
        ) : (
          <div className="text-red-500 font-semibold">Admin access required to comment</div>
        )}

      </div>
    </div>
  );
};

export default DetailsEntry;
