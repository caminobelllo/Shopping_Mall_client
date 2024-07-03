import styled from "styled-components";

const MemberList = ({ id, name, address }) => {
  return (
    <Container>
      <Content>{id}</Content>
      <Content>{name}</Content>
      <Content>
        {address.city + ", " + address.street + ", " + address.zipcode}
      </Content>
    </Container>
  );
};

export default MemberList;

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
