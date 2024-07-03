import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axiosInstance.get("/orders");
    console.log(response.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <DataTable
        value={orders}
        responsibleLayout="scroll"
        dataKey="id"
        paginator
        rows={5}
        showGridlines
        stripedRows
        emptyMessage="-"
        tableStyle={{
          width: "65rem",
          height: "20rem",
          textAlign: "center",
        }}
      >
        <Column
          field="id"
          header="상품 ID"
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 9rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="memberId"
          header="사용자 ID"
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 9rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="items"
          header="주문 상품 정보"
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 9rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
      </DataTable>
    </Container>
  );
};

export default Orders;

const Container = styled.div`
  margin-top: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
