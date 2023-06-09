import React, { useContext } from "react";
import styled from "styled-components";
import Card from "../../../../reusable/Card";
import { formatPrice } from "../../../../../utils/maths";
import OrderContext from "../../../../../context/OrderContext";
import EmptyMenu from "./EmptyMenu";
import { focusTitleEditBox } from "../../../../../utils/ref";
import { theme } from "../../../../../theme";
import { getImageSource } from "../../../../../utils/falsy";
import { findObjectById, isEmpty } from "../../../../../utils/array";
import LoadingMessage from "./LoadingMessage";
import { BasketProduct, Product } from "../../../../../utils/interfaces";
import { NO_INGREDIENTS_MESSAGE } from "../../../../../ts/enum";

export default function Menu() {
  const {
    isAdmin,
    menu,
    selectProductToEdit,
    handleProductDelete,
    reloadMenu,
    titleEditBoxRef,
    handleAddToBasket,
    productToEdit,
    setProductToEdit,
    basket,
    handleRemoveFromBasket,
    isCardSelected,
    isLoading,
    updateProductQuantity,
  } = useContext(OrderContext);

  const isMenuEmpty = isEmpty(menu);

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    handleProductDelete(id);
    focusTitleEditBox(titleEditBoxRef);
    if (productToEdit && productToEdit.id === id)
      setProductToEdit({} as Product);
    if (findObjectById(id, basket)) handleRemoveFromBasket(id);
  };

  const onAdd = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    handleAddToBasket(id);
  };

  const onRemove = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    handleRemoveFromBasket(id);
  };

  const onIncrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    productInBasket: BasketProduct | undefined
  ) => {
    e.stopPropagation();
    if (!productInBasket) return;
    updateProductQuantity(productInBasket, +1);
  };

  const onDecrement = (
    e: React.MouseEvent<HTMLButtonElement>,
    productInBasket: BasketProduct | undefined
  ) => {
    e.stopPropagation();
    if (!productInBasket) return;

    const quantity = productInBasket.quantity;

    if (quantity === 0) return;

    if (quantity === 1) {
      handleRemoveFromBasket(productInBasket.id);
      return;
    }
    updateProductQuantity(productInBasket, -1);
  };

  if (isLoading) return <LoadingMessage />;

  if (isMenuEmpty)
    return <EmptyMenu isAdmin={isAdmin} reloadMenu={reloadMenu} />;

  return (
    <MenuStyled>
      {menu.map(({ id, imageSource, title, price, productDetails }) => {
        const productInBasket = findObjectById(id, basket) as
          | BasketProduct
          | undefined;
        return (
          <Card
            key={id}
            imageSource={getImageSource(imageSource)}
            title={title}
            leftDescription={formatPrice(price)}
            productDetails={
              productDetails ? productDetails : NO_INGREDIENTS_MESSAGE
            }
            hasDeleteButton={isAdmin}
            onDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
              onDelete(e, id)
            }
            onClick={isAdmin ? () => selectProductToEdit(id) : () => {}}
            addProductToBasket={(e: React.MouseEvent<HTMLButtonElement>) =>
              onAdd(e, id)
            }
            removeProductFromBasket={(e: React.MouseEvent<HTMLButtonElement>) =>
              onRemove(e, id)
            }
            isHoverable={isAdmin}
            isSelected={isCardSelected(id)}
            basketQuantity={productInBasket?.quantity}
            onIncrement={(e: React.MouseEvent<HTMLButtonElement>) =>
              onIncrement(e, productInBasket)
            }
            onDecrement={(e: React.MouseEvent<HTMLButtonElement>) =>
              onDecrement(e, productInBasket)
            }
          />
        );
      })}
    </MenuStyled>
  );
}

const MenuStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-row-gap: 60px;
  grid-column-gap: 5px;
  min-height: 83%;
  background: none;
  padding: 50px 50px 150px;
  overflow-y: scroll;
  box-shadow: ${theme.shadows.strong};

  ::-webkit-scrollbar {
    display: none;
  }
`;
