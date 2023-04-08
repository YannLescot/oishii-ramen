import React from "react";
import styled from "styled-components";
import { theme } from "../../../../theme";

export default function EmptyMenuCustomer() {
  return (
    <EmptyMenuCustomerStyled>
      <h1>Victime de notre succès ! :D</h1>

      <h2>De nouvelles recettes sont encours de préparation.</h2>

      <h3>À très vite !</h3>
    </EmptyMenuCustomerStyled>
  );
}

const EmptyMenuCustomerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: "Amatic SC", cursive;
    font-size: ${theme.fonts.size.P4};
    font-weight: ${theme.fonts.weight.bold};
    color: ${theme.colors.greyBlue};
    margin-bottom: 31px;
    margin-top: 0px;
  }

  h2 {
    font-family: "Amatic SC", cursive;
    font-size: ${theme.fonts.size.P4};
    font-weight: ${theme.fonts.weight.regular};
    color: ${theme.colors.greyBlue};
    margin-top: 0px;
    margin-bottom: 31px;
  }

  h3 {
    font-family: "Amatic SC", cursive;
    font-size: ${theme.fonts.size.P4};
    font-weight: ${theme.fonts.weight.regular};
    color: ${theme.colors.greyBlue};
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;