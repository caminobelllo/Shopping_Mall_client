import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import MemberList from "../components/members/MemberList";

const Members = () => {
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState("");

  const getMembers = async () => {
    const response = await axiosInstance.get("/members");
    console.log(response.data);
    setMembers(response.data);
  };

  const handleName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleCity = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const handleStreet = (event) => {
    event.preventDefault();
    setStreet(event.target.value);
  };
  const handleZipCode = (event) => {
    event.preventDefault();
    setZipCode(event.target.value);
  };
  const onReset = () => {
    setName("");
    setCity("");
    setStreet("");
    setZipCode("");
  };

  const addMember = async (event) => {
    event.preventDefault();

    await axiosInstance.post("/members", {
      memberName: name,
      address: {
        city: city,
        street: street,
        zipcode: zipcode,
      },
    });
    getMembers();
    onReset();
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <Container>
      <form>
        <Input
          type="text"
          onChange={handleName}
          placeholder="사용자 이름"
        ></Input>
        <Input type="text" onChange={handleCity} placeholder="XX시"></Input>
        <Input type="text" onChange={handleStreet} placeholder="XX길"></Input>
        <Input
          type="text"
          onChange={handleZipCode}
          placeholder="XX번길"
        ></Input>
        <AddItem type="submit" onClick={addMember}>
          사용자 등록하기
        </AddItem>
      </form>

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

const Input = styled.input`
  height: 48px;
  margin-right: 12px;
  font-size: 16px;
`;
