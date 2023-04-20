import React, { useContext } from "react";
import styled from "styled-components";
import { theme } from "../../../../../theme";
import BasketCard from "../../../../reusable/BasketCard";
import OrderContext from "../../../../../context/OrderContext";
import { formatPrice } from "../../../../../utils/maths";
import { focusTitleEditBox } from "../../../../../utils/ref";

export default function BasketBody() {
  const {
    basket,
    menu,
    handleRemoveFromBasket,
    isAdmin,
    productToEdit,
    setActiveTab,
    setIsPanelCollapsed,
    setProductToEdit,
    titleEditBoxRef,
    activeTab,
  } = useContext(OrderContext);

  const selectProductToEdit = async (id) => {
    const product = menu.find((item) => item.id === id);
    await setActiveTab("edit");
    await setIsPanelCollapsed(false);
    await setProductToEdit(product);

    focusTitleEditBox(titleEditBoxRef);
  };

  const isCardSelected = (id) => {
    return productToEdit && activeTab === "edit" && productToEdit.id === id;
  };

  return (
    <BasketBodyStyled>
      {basket.length === 0 ? (
        <div className="empty">Votre commande est vide.</div>
      ) : (
        <div className="produits">
          {basket.map((product) => {
            const productInfo = menu.find((item) => item.id === product.id);
            return (
              <BasketCard
                key={product.id}
                imageSource={
                  productInfo.imageSource
                    ? productInfo.imageSource
                    : "/images/coming-soon.png"
                }
                title={productInfo.title}
                price={formatPrice(productInfo.price)}
                quantity={product.quantity}
                onDelete={() => handleRemoveFromBasket(product.id)}
                isHoverable={isAdmin}
                isSelected={isCardSelected(product.id)}
                onClick={() => selectProductToEdit(product.id)}
              />
            );
          })}
        </div>
      )}
    </BasketBodyStyled>
  );
}

const BasketBodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  z-index: 2;

  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.font.sizes.P4};
    font-family: ${theme.font.families.stylish};
    color: ${theme.colors.greyBlue};
  }

  .produits {
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
