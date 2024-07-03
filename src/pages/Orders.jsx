import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import styled from "styled-components";

const OrderItem = ({ item }) => (
  <div>
    <p>상품 이름: {item.itemName}</p>
    <p>가격: {item.itemPrice}</p>
    <p>주문 수량: {item.orderQuantity}</p>
    <p>주문 상태: {item.orderStatus}</p>
  </div>
);

const Order = ({ order }) => (
  <OrderContainer>
    <p>상품 ID: {order.id}</p>
    <p>주문 일시: {new Date(order.orderedAt).toLocaleString()}</p>
    <div>
      {order.items.map((item) => (
        <OrderItem key={item.itemId} item={item} />
      ))}
    </div>
  </OrderContainer>
);

const OrderList = ({ orders }) => (
  <OrderListContainer>
    {orders.map((order) => (
      <Order key={order.id} order={order} />
    ))}
  </OrderListContainer>
);

const OrderContainer = styled.div`
  border: 1px solid gray;
  background-color: aliceblue;
  padding: 1rem 2rem;
  margin-bottom: 8px;
`;
const OrderListContainer = styled.div``;

const Orders = () => {
  // 첫 번째 카테고리
  const [orderList, setOrderList] = useState([]); // memberId로 받아올 리스트 저장하는 state
  const [mId1, setMId1] = useState(); // 입력받는 memberId 값

  const handleMId1 = (event) => {
    event.preventDefault();
    setMId1(event.target.value);
  };
  const getOrderList = async (event) => {
    event.preventDefault();
    const response = await axiosInstance.get(`/orders?memberId=${mId1}`);
    setOrderList(response.data);
  };

  // 두 번째 카테고리
  const [mId2, setMId2] = useState();
  const [itemId, setItemId] = useState();
  const [orderQuantity, setOrderQuantity] = useState();
  const [desc, setDesc] = useState("주문 등록하기");

  const handleMId2 = (event) => {
    event.preventDefault();
    setMId2(event.target.value);
  };
  const handleItemId = (event) => {
    event.preventDefault();
    setItemId(event.target.value);
  };
  const handleOrderQuantity = (event) => {
    event.preventDefault();
    setOrderQuantity(event.target.value);
  };
  const addOrder = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.post("/orders", {
        memberId: mId2,
        items: [
          {
            itemId: itemId,
            orderQuantity: orderQuantity,
          },
        ],
      });
      setDesc("주문 등록에 성공하였습니다.");
    } catch (error) {
      setDesc(`주문 등록에 실패하였습니다. ${error.response.data[0]}`);
      console.log(error.response.data);
    }
  };

  // 카테고리 3
  const [orderId, setOrderId] = useState(); // 입력받는 memberId 값
  const [orderEach, setOrderEach] = useState(null);

  const handleOrderId = (event) => {
    event.preventDefault();
    setOrderId(event.target.value);
  };
  const getOrder = async (event) => {
    event.preventDefault();
    const response = await axiosInstance.get(`/orders/${orderId}`);
    setOrderEach(response.data);
  };

  useEffect(() => {}, [orderId, mId1, mId2, itemId]);

  return (
    <Container>
      {/* 카테고리 1 */}
      <Category>
        <Title>개별 사용자 주문 리스트 조회하기</Title>
        <form>
          <Input
            type="number"
            onChange={handleMId1}
            placeholder="사용자 ID"
          ></Input>
          <Button type="submit" onClick={getOrderList}>
            검색하기
          </Button>
        </form>
      </Category>
      {/* 데이터 렌더링 */}
      <OrderList orders={orderList} />

      {/* 카테고리 2 */}
      <Category>
        <Title>주문 등록하기</Title>
        <form>
          <Input type="number" onChange={handleMId2} placeholder="사용자 ID" />
          <Input type="number" onChange={handleItemId} placeholder="상품 ID" />
          <Input
            type="number"
            onChange={handleOrderQuantity}
            placeholder="주문 수량"
          />
          <Button type="submit" onClick={addOrder}>
            등록하기
          </Button>
        </form>
        {/* 성공 및 실패 결과 나타냄 */}
        <Description>{desc}</Description>
      </Category>

      {/* 카테고리 3 */}
      <Category>
        <Title>주문 id로 주문 정보 조회하기</Title>
        <form>
          <Input
            type="number"
            onChange={handleOrderId}
            placeholder="주문 ID"
          ></Input>
          <Button type="submit" onClick={getOrder}>
            검색하기
          </Button>
        </form>
      </Category>
      {orderEach && (
        <OrderEachContainer>
          <OrderEachItem>
            <span style={{ marginRight: "16px" }}>
              <span style={{ fontWeight: "600" }}>주문 ID: </span>
              <span>{orderEach.id}</span>
            </span>
            <span style={{ marginRight: "16px" }}>
              <span style={{ fontWeight: "600" }}>사용자 ID: </span>
              <span>{orderEach.memberId}</span>
            </span>
            <span style={{ marginRight: "16px" }}>
              <span style={{ fontWeight: "600" }}>주문일시: </span>
              <span>{orderEach.orderedAt}</span>
            </span>
          </OrderEachItem>
          {(orderEach.items || []).map((item, index) => (
            <OrderEachItem key={index}>
              <span style={{ marginRight: "16px" }}>
                <span style={{ fontWeight: "600" }}>상품 ID: </span>
                <span>{item.itemId}</span>
              </span>
              <span style={{ marginRight: "16px" }}>
                <span style={{ fontWeight: "600" }}>상품 이름: </span>
                <span>{item.itemName}</span>
              </span>
              <span style={{ marginRight: "16px" }}>
                <span style={{ fontWeight: "600" }}>상품 가격: </span>
                <span>{item.itemPrice}</span>
              </span>
              <span style={{ marginRight: "16px" }}>
                <span style={{ fontWeight: "600" }}>주문 수량: </span>
                <span>{item.orderQuantity}</span>
              </span>
              <span style={{ marginRight: "16px" }}>
                <span style={{ fontWeight: "600" }}>주문 상태: </span>
                <span>{item.orderStatus}</span>
              </span>
            </OrderEachItem>
          ))}
        </OrderEachContainer>
      )}
    </Container>
  );
};

export default Orders;

const OrderEachContainer = styled(OrderContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderEachItem = styled.div`
  margin: 10px 0;
  justify-content: space-between;
`;

const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  font-size: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const Category = styled.div`
  width: 60%;
  height: fit-content;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Description = styled.span`
  font-size: 16px;
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
