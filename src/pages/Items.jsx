import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import ItemTable from "../components/items/ItemTable";

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
      <ItemTable items={items} />
    </Container>
  );
};

export default Items;

const Container = styled.div`
  margin-top: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
