import React from "react";
import styled from "styled-components";
import { LuShoppingCart } from "react-icons/lu";
import { MdPeopleOutline } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Category
        onClick={() => {
          navigate("/items");
        }}
      >
        <LuShoppingCart size={48} />
        <Title>Items</Title>
        <Description>상품 등록과 조회, 재고 관리 등</Description>
      </Category>
      <Category
        onClick={() => {
          navigate("/members");
        }}
      >
        <MdPeopleOutline size={48} />
        <Title>Members</Title>
        <Description>사용자 등록과 조회</Description>
      </Category>
      <Category
        onClick={() => {
          navigate("/orders");
        }}
      >
        <IoReceiptOutline size={48} />
        <Title>Orders</Title>
        <Description>주문 등록과 조회</Description>
      </Category>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 120px 280px;
`;

const Category = styled.div`
  width: 200px;
  height: fit-content;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Description = styled.span`
  font-size: 16px;
`;
