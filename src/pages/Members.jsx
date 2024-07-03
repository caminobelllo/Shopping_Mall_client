import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [address, setAddress] = useState("");

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
      <DataTable
        value={members}
        responsibleLayout="scroll"
        dataKey="id"
        paginator
        rows={5}
        showGridlines
        stripedRows
        emptyMessage="-"
        tableStyle={{
          width: "65rem",
          height: "20rem",
          textAlign: "center",
        }}
      >
        <Column
          field="id"
          header="사용자 ID"
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 9rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="memberName"
          header="사용자 이름"
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 9rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
        <Column
          field="address.street"
          header="주소"
          headerStyle={{
            fontSize: "20px",
            fontWeight: "800",
            padding: "1rem 0 1rem 9rem",
            backgroundColor: "#f3f3f3",
          }}
        ></Column>
      </DataTable>
    </Container>
  );
};

export default Members;

const Container = styled.div`
  margin-top: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
