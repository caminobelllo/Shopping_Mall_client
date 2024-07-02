import React, { useEffect } from "react";
import { axiosInstance } from "../api";

const Items = () => {
  const getItems = async () => {
    const response = await axiosInstance.get("/items");
    console.log(response.data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return <div>Items</div>;
};

export default Items;
