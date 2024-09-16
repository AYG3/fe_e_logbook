import React from "react";
import axiosInstance from "../utils/axiosConfig";


export const handleExtra = async (extra, textArea, setExtra, setTextArea, day, nature_of_activities, date, entryId, editIndex, setEditIndex) => {
    try {
      let updatedExtra;

      if (editIndex != null) {
        extra[editIndex] = textArea;
        setEditIndex(null);
      } else {
        // updatedExtra = [...extra, textArea];
        extra.push(textArea)
        setExtra(updatedExtra);
      }
      setTextArea("");
      console.log("Extra after: ", extra);
      console.log("updatedExtra after: ", updatedExtra);

      const data = {
        day: day,
        nature_of_activities,
        date: date,
        extra,
      };

      console.log("entryId: ", entryId);

      console.log("Data sent: ", data);

      const res = await axiosInstance.put(
        `/logbook/editLogbook/${entryId}`,
        data
      );
      if (res.status !== 200) {
        console.log("Put Error updating extra: ", res.data);
      } else {
        console.log("Put Succesfully updated extra");
        window.location.reload();
      };
    } catch (error) {
      console.log("Error handling extra: ", error);
    }
  };

  //Sets editIndex
  export const handleEditExtra = (index, extra, setEditIndex, setTextArea) => {
    setEditIndex(index);
    setTextArea(extra[index]);
  };


  //Handle delete for extra
  export const handleDeleteExtra = async (index, extra, setExtra, day, nature_of_activities, date, entryId) => {
    extra.splice(index, 1);
    console.log("After delete extra: ", extra);

    try {
      const data = {
        day: day,
        nature_of_activities,
        date: date,
        extra,
      };

      const res = await axiosInstance.put(`/logbook/editLogbook/${entryId}`, data );

      if (res.status !== 200) {
        console.log("Error deleting extra", res.data);
      } else {
        console.log("Suceesfully deleted extra", res.data);
        // window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting extra catch: ", error);
    }
  };