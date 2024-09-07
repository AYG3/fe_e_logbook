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
        const res = await axios.get("http://localhost:4444/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User data: ", res.data);
        setUser(res.data);    

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
          `http//:localhost:4444/userLogbooks/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEntries(res.data.data);
      } catch (error) {}
    };
  });

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
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Logbook;
