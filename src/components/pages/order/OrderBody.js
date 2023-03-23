import React from "react";
import styled from "styled-components";
import Main from "./Main";
import Navbar from "./Navbar";

export default function OrderBody() {
  return (
    <OrderBodyStyled>
      <Navbar />
      <Main />
    </OrderBodyStyled>
  );
}

const OrderBodyStyled = styled.div`
  height: 95vh;
  width: 1400px;
`;
