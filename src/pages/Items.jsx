import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import ItemList from "../components/items/ItemList";
import styled from "styled-components";

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
      {items.map((item) => (
        <ItemList
          key={item.id}
          name={item.itemName}
          price={item.itemPrice}
          quantity={item.stockQuantity}
        />
      ))}
    </Container>
  );
};

export default Items;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
