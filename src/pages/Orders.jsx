import React, { useEffect } from "react";
import { axiosInstance } from "../api";

const Orders = () => {
  const getOrders = async () => {
    const response = await axiosInstance.get("/orders");
    console.log(response.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return <div>Orders</div>;
};

export default Orders;
