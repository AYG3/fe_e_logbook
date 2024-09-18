import axiosInstance from "../utils/axiosConfig";

export const handleAdminForm = async (e,approval, comment, entryId ) => {
    e.preventDefault();

    try {
      
      const commentData = {
        approval: approval,
        comment: comment,
      }
      const res = await axiosInstance.put(`/logbook/admin/addComment/${entryId}`, commentData);
      
      console.log("Handling Form (Try block) Response: ", res);
      if(res==200){
        console.log("Comment Succesful");
        console.log("Response data: ", res);
      }

    } catch (error) {
      console.log("handleAdminForm Error: ", error);
    }
  }

  export const handleApprovalChange = (e, setApproval) =>{
    setApproval(e.target.value);
  } 

  export const handleCommentChange = (e, setComment) =>{
    setComment(e.target.value);
  }