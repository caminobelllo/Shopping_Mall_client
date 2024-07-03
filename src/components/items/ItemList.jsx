import React from "react";
import styled from "styled-components";
import { useReactTable } from "@tanstack/react-table";

const ItemList = ({ id, name, price, quantity }) => {
  return (
    <Container>
      <InnerText>{id}</InnerText>
      <InnerText>{name}</InnerText>
      <InnerText>{price}</InnerText>
      <InnerText>{quantity}</InnerText>
    </Container>
  );
};

export default ItemList;

const Container = styled.div`
  background-color: lightgreen;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const InnerText = styled.span`
  font-size: 18px;
`;
