import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/all-users");
        setAllUsers(response.data);
      } catch (error) {
        console.log(error.response);
        if (error.response.statusText === "Unauthorized") {
          navigate("/login");
        }
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>This is Protected Home Page</h1>
      <p>List Of Users In Database: </p>
      {allUsers.map((user, index) => {
        return <p key={index}>Email: {user.email}</p>;
      })}
    </div>
  );
}

export default Home;
