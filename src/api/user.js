import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";



//Create entry
export const handleCreateEntry = (day, nature_of_activities, date, navigate) => {

    const token = localStorage.getItem('token')
    console.log("token: ", token)
    
    const userId = localStorage.getItem('userId')
    console.log("userId: ", userId)

    const activitiesArray = nature_of_activities.split('\n').map((line) => {
      const trimmedLine = line.trim();
      return trimmedLine.startsWith('•') ? trimmedLine : `• ${trimmedLine}`
    })

    try {
        const activitiesString = activitiesArray.join('\n');
        const data = {
            day,
            nature_of_activities: activitiesString,
            date,
            user: userId
        }
    
        axiosInstance.post(`/logbook/logbookEntry`, data, )
            console.log('Entry created successfully')
            navigate('/logbooks')
    } catch (error) {
        console.log(error)
    }
}


// Add or update extra
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