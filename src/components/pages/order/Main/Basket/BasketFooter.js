import React from "react";
import styled from "styled-components";
import { theme } from "../../../../../theme";

export default function BasketFooter() {
  return <BasketFooterStyled>Codé avec 🥰 et React.JS</BasketFooterStyled>;
}

const BasketFooterStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.background_dark};
  border-bottom-left-radius: ${theme.borderRadius.extraRound};

  font-size: ${theme.font.sizes.P2};
  font-family: ${theme.font.families.stylish};
  color: ${theme.colors.white};
`;
