import React from "react";
import styled from "styled-components";

const Headers = () => {
  return (
    <header>
      <Container>
        <Title>Shopping Mall</Title>
      </Container>
    </header>
  );
};

export default Headers;

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
`;

const Title = styled.span`
  font-size: 28px;
`;
