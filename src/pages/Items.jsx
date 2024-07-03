import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import ItemList from "../components/items/ItemList";

const Items = () => {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const getItems = async () => {
    const response = await axiosInstance.get("/items");
    console.log(response.data);
    setItems(response.data);
  };

  const handleName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    event.preventDefault();
    setPrice(event.target.value);
  };

  const handleQuantity = (event) => {
    event.preventDefault();
    setQuantity(event.target.value);
  };

  const onReset = () => {
    setName("");
    setPrice();
    setQuantity();
  };

  const addItem = async (event) => {
    event.preventDefault();

    await axiosInstance.post("/items", {
      itemName: name,
      itemPrice: price,
      stockQuantity: quantity,
    });
    getItems();
    onReset();
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      <form>
        <Input
          type="text"
          onChange={handleName}
          placeholder="상품 이름"
        ></Input>
        <Input
          type="number"
          onChange={handlePrice}
          placeholder="상품 가격"
        ></Input>
        <Input
          type="number"
          onChange={handleQuantity}
          placeholder="재고 수량"
        ></Input>
        <AddItem type="submit" onClick={addItem}>
          상품 등록하기
        </AddItem>
      </form>

      <TableHeader>
        <span>상품 ID</span>
        <span>상품명</span>
        <span>가격</span>
        <span>수량</span>
      </TableHeader>
      {items.map((item) => (
        <ItemList
          key={item.id}
          id={item.id}
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
  margin-top: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddItem = styled.button`
  width: 180x;
  height: 52px;
  margin-left: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  :hover {
    background-color: #646464;
  }
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

const Form = styled.form``;

const Input = styled.input`
  height: 48px;
  margin-right: 12px;
  font-size: 16px;
`;
