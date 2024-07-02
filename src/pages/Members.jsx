import React, { useEffect } from "react";
import { axiosInstance } from "../api";

const Members = () => {
  const getMembers = async () => {
    const response = await axiosInstance.get("/members");
    console.log(response.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return <div>Members</div>;
};

export default Members;
