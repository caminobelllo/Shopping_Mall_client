import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";
import ItemList from "../components/items/ItemList";

const Items = () => {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState();
  const [editQuantity, setEditQuantity] = useState();

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

  const handleEditName = (event) => {
    event.preventDefault();
    setEditName(event.target.value);
  };

  const handleEditPrice = (event) => {
    event.preventDefault();
    setEditPrice(event.target.value);
  };

  const handleEditQuantity = (event) => {
    event.preventDefault();
    setEditQuantity(event.target.value);
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

  // id 값으로 찾기
  const [itemId, setItemId] = useState(); // 입력받는 itemId 값
  const [eachItem, setEachItem] = useState(null);

  const handleItemId = (event) => {
    event.preventDefault();
    setItemId(event.target.value);
  };
  const getEachItem = async (event) => {
    event.preventDefault();
    const response = await axiosInstance.get(`/items/${itemId}`);
    setEachItem(response.data);
  };

  const deleteItem = async (id) => {
    await axiosInstance.delete(`/items/${id}`);
    getItems();
  };
  const updateItem = async (event) => {
    event.preventDefault();

    await axiosInstance.patch(`/items/${itemId}`, {
      itemName: editName,
      itemPrice: editPrice,
      stockQuantity: editQuantity,
    });

    getItems();
    getEachItem(event);
    onReset();
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      <Title>상품 id로 개별 상품 조회하기</Title>
      <form>
        <Input
          type="number"
          value={itemId}
          onChange={handleItemId}
          placeholder="상품 id"
        />
        <Button type="submit" onClick={getEachItem}>
          조회하기
        </Button>
      </form>
      <div>
        {eachItem && (
          <DataContainer>
            <div>
              <span style={{ marginRight: "8px", fontWeight: "600" }}>
                상품 ID:{" "}
              </span>
              <span>{eachItem.id}</span>
            </div>

            <div>
              <span style={{ marginRight: "8px", fontWeight: "600" }}>
                상품명:{" "}
              </span>
              <span>{eachItem.itemName}</span>
            </div>
            <div>
              <span style={{ marginRight: "8px", fontWeight: "600" }}>
                가격:{" "}
              </span>
              <span>{eachItem.itemPrice}</span>
            </div>
            <div>
              <span style={{ marginRight: "8px", fontWeight: "600" }}>
                수량:{" "}
              </span>
              <span>{eachItem.stockQuantity}</span>
            </div>
            <DeleteButton onClick={() => deleteItem(eachItem.id)}>
              삭제하기
            </DeleteButton>
            <form>
              <Input
                type="text"
                value={editName}
                onChange={handleEditName}
                placeholder="상품 이름"
              />
              <Input
                type="number"
                value={editPrice}
                onChange={handleEditPrice}
                placeholder="상품 가격"
              />
              <Input
                type="number"
                value={editQuantity}
                onChange={handleEditQuantity}
                placeholder="재고 수량"
              />
              <Button type="submit" onClick={updateItem}>
                수정하기
              </Button>
            </form>
          </DataContainer>
        )}
      </div>

      <Title>상품 등록하기</Title>
      <form>
        <Input
          type="text"
          value={name}
          onChange={handleName}
          placeholder="상품 이름"
        ></Input>
        <Input
          type="number"
          value={price}
          onChange={handlePrice}
          placeholder="상품 가격"
        ></Input>
        <Input
          type="number"
          value={quantity}
          onChange={handleQuantity}
          placeholder="재고 수량"
        ></Input>
        <Button type="submit" onClick={addItem}>
          상품 등록하기
        </Button>
      </form>

      <Title>전체 상품 리스트</Title>
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
        >
          <DeleteButton onClick={() => deleteItem(item.id)}>
            삭제하기
          </DeleteButton>
        </ItemList>
      ))}
    </Container>
  );
};

export default Items;

const Container = styled.div`
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

const Button = styled.button`
  width: 180px;
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

const TableHeader = styled.div`
  width: 60%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff2f2;
  font-size: 16px;
  font-weight: 800;
  padding: 0 24px;
`;

const Input = styled.input`
  height: 48px;
  margin-right: 12px;
  font-size: 16px;
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
