import React, { useEffect, useState } from "react";
import axios from "axios";

const Logbook = () => {
  const [entries, setEntries] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log('token: ', token)
        
        const res = await axios.get(`http://localhost:4444/auth/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(res.data);    
        console.log("User data: ", res.data);

      } catch (error) {
        console.log("Error fetching user details", error)
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const res = await axios.get(
          // `http//:localhost:4444/userLogbooks/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEntries(res.data.data);

      } catch (error) {}
    };

    fetchEntries()
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-seperate border-spacing-2">
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
        {/* {entries.map((entry) => {
          return (
          <tr key={entry._id}>
            <td>{entry.id}</td>
            <td>{entry.day}</td>
            <td>{entry.nature_of_activities}</td>
          </tr>
          )
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default Logbook;
