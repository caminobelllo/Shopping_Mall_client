import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import OrderList from "../components/orders/OrderList";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [memberId, setMemberId] = useState();

  const getOrders = async () => {
    //const response = await axiosInstance.get(`/orders?memberId=${m_id}`);
    //console.log(response.data);
    //setOrders(response.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <TableHeader>
        <span>사용자 ID</span>
        <span style={{ paddingRight: "120px" }}>사용자 이름</span>
        <span style={{ paddingRight: "100px" }}>주소</span>
      </TableHeader>
      {orders.map((item) => (
        <OrderList
          key={item.id}
          id={item.id}
          name={item.memberName}
          address={item.address}
        />
      ))}
    </Container>
  );
};

export default Orders;

const Container = styled.div`
  margin-top: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TableHeader = styled.div`
  width: 60%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff2f2;
  font-size: 20px;
  font-weight: 800;
  padding: 0 24px;
`;
