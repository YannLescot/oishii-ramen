import React, { useContext } from "react";
import styled from "styled-components";
import OrderContext from "../../../../../context/OrderContext";
import HorizontalCard from "../../../../reusable/HorizontalCard";
import { formatPrice } from "../../../../../utils/maths";
import { getImageSource } from "../../../../../utils/falsy";
import { findObjectById } from "../../../../../utils/array";
import EmptyButton from "./EmptyButton";

export default function BasketCards() {
  const {
    basket,
    menu,
    handleRemoveFromBasket,
    isAdmin,
    isCardSelected,
    selectProductToEdit,
  } = useContext(OrderContext);

  const handleOnDelete = (e, id) => {
    e.stopPropagation();
    handleRemoveFromBasket(id);
  };

  return (
    <BasketCardsStyled>
      {basket.map((product) => {
        const productInfo = findObjectById(product.id, menu);
        !productInfo && handleRemoveFromBasket(product.id);
        return (
          <HorizontalCard
            key={product.id}
            imageSource={getImageSource(productInfo.imageSource)}
            title={productInfo.title}
            price={formatPrice(productInfo.price)}
            quantity={product.quantity}
            onDelete={(e) => handleOnDelete(e, product.id)}
            isClickable={isAdmin}
            isSelected={isCardSelected(product.id)}
            onClick={isAdmin ? () => selectProductToEdit(product.id) : null}
          />
        );
      })}
      <EmptyButton />
    </BasketCardsStyled>
  );
}

const BasketCardsStyled = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
