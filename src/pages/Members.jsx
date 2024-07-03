import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import MemberList from "../components/members/MemberList";

const Members = () => {
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    const response = await axiosInstance.get("/members");
    console.log(response.data);
    setMembers(response.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <Container>
      <TableHeader>
        <span>사용자 ID</span>
        <span style={{ paddingRight: "120px" }}>사용자 이름</span>
        <span style={{ paddingRight: "100px" }}>주소</span>
      </TableHeader>
      {members.map((item) => (
        <MemberList
          key={item.id}
          id={item.id}
          name={item.memberName}
          address={item.address}
        />
      ))}
    </Container>
  );
};

export default Members;

const Container = styled.div`
  margin-top: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
