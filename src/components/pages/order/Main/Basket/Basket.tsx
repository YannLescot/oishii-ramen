import React from "react";
import styled from "styled-components";
import BasketHeader from "./BasketHeader";
import BasketFooter from "./BasketFooter";
import BasketBody from "./BasketBody";
import { theme } from "../../../../../theme";

export default function Basket() {
  return (
    <BasketStyled>
      <BasketHeader />
      <BasketBody />
      <BasketFooter />
    </BasketStyled>
  );
}

const BasketStyled = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  height: 100%;
  max-height: calc(95vh - 10vh);
  position: relative;
  overflow: hidden;
  box-shadow: ${theme.shadows.light};
`;
