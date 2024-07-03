import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Items = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await axiosInstance.get("/items");
    console.log(response.data);
    setItems(response.data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      {/* {items.map((item) => (
        <ItemList
          key={item.id}
          name={item.itemName}
          price={item.itemPrice}
          quantity={item.stockQuantity}
        />
      ))} */}
      <DataTable
        value={items}
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
          header="ID"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "24px",
            fontWeight: "800",
            padding: "2rem 0 2rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="itemName"
          header="상품명"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "24px",
            fontWeight: "800",
            padding: "2rem 0 2rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="itemPrice"
          header="가격"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "24px",
            fontWeight: "800",
            padding: "2rem 0 2rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="stockQuantity"
          header="수량"
          style={{ width: "25%" }}
          headerStyle={{
            fontSize: "24px",
            fontWeight: "800",
            padding: "2rem 0 2rem 6.5rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
      </DataTable>
    </Container>
  );
};

export default Items;

const Container = styled.div`
  margin-top: 100px;
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
