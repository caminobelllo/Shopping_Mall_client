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

  const [editName, setEditName] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editStreet, setEditStreet] = useState("");
  const [editZipcode, setEditZipCode] = useState("");

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

  const handleEditName = (event) => {
    event.preventDefault();
    setEditName(event.target.value);
  };

  const handleEditCity = (event) => {
    event.preventDefault();
    setEditCity(event.target.value);
  };

  const handleEditStreet = (event) => {
    event.preventDefault();
    setEditStreet(event.target.value);
  };
  const handleEditZipCode = (event) => {
    event.preventDefault();
    setEditZipCode(event.target.value);
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

  // id 값으로 찾기
  const [memberId, setMemberId] = useState(); // 입력받는 itemId 값
  const [eachMember, setEachMember] = useState(null);

  const handleMemberId = (event) => {
    event.preventDefault();
    setMemberId(event.target.value);
  };
  const getEachMember = async (event) => {
    event.preventDefault();
    const response = await axiosInstance.get(`/members/${memberId}`);
    setEachMember(response.data);
  };

  const deleteMember = async (id) => {
    await axiosInstance.delete(`/members/${id}`);
    getMembers();
  };

  const updateItem = async (event) => {
    event.preventDefault();

    await axiosInstance.patch(`/members/${memberId}`, {
      memberName: editName,
      address: {
        city: editCity,
        street: editStreet,
        zipcode: editZipcode,
      },
    });

    getMembers();
    getEachMember(event);
    onReset();
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <Container>
      <Title>사용자 id로 정보 조회하기</Title>
      <form>
        <Input
          type="number"
          onChange={handleMemberId}
          placeholder="사용자 id"
        />
        <Button type="submit" onClick={getEachMember}>
          조회하기
        </Button>
      </form>
      <div>
        {eachMember && (
          <DataContainer>
            <div>
              <span style={{ marginRight: "8px", fontWeight: "600" }}>
                사용자 ID:{" "}
              </span>
              <span>{eachMember.id}</span>
            </div>
            <div>
              <span style={{ marginRight: "8px", fontWeight: "600" }}>
                사용자 이름:{" "}
              </span>
              <span>{eachMember.memberName}</span>
            </div>
            <div>
              <span style={{ marginRight: "8px", fontWeight: "600" }}>
                주소:{" "}
              </span>
              <span>
                {eachMember.address.city}, {eachMember.address.street},{" "}
                {eachMember.address.zipcode}
              </span>
            </div>
            <DeleteButton onClick={() => deleteMember(eachMember.id)}>
              삭제하기
            </DeleteButton>
            <form>
              <Input
                type="text"
                value={editName}
                onChange={handleEditName}
                placeholder="사용자 이름"
              />
              <Input
                type="text"
                value={editCity}
                onChange={handleEditCity}
                placeholder="XX시"
              />
              <Input
                type="text"
                value={editStreet}
                onChange={handleEditStreet}
                placeholder="XX길"
              />
              <Input
                type="text"
                value={editZipcode}
                onChange={handleEditZipCode}
                placeholder="XX번길"
              />
              <Button type="submit" onClick={updateItem}>
                수정하기
              </Button>
            </form>
          </DataContainer>
        )}
      </div>

      <Title>사용자 등록하기</Title>
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
  margin-top: 50px;
  margin-bottom: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  padding: 48px;
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

const Button = styled.button`
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

const DeleteButton = styled(Button)`
  margin-top: 24px;
`;

const DataContainer = styled.div`
  border: 1px solid gray;
  background-color: aliceblue;
  padding: 1rem 2rem;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
