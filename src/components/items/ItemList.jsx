import styled from "styled-components";
const ItemList = ({ id, name, price, quantity }) => {
  return (
    <Container>
      <Content>{id}</Content>
      <Content>{name}</Content>
      <Content>{price}</Content>
      <Content>{quantity}</Content>
    </Container>
  );
};

export default ItemList;

const Container = styled.div`
  width: 60%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid lightgray;
`;

const Content = styled.span`
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HandleContent = styled.button``;
