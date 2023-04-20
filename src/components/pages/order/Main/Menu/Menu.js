import React, { useContext } from "react";
import styled from "styled-components";
import Card from "../../../../reusable/Card";
import { formatPrice } from "../../../../../utils/maths";
import OrderContext from "../../../../../context/OrderContext";
import EmptyMenu from "./EmptyMenu";
import { focusTitleEditBox } from "../../../../../utils/ref";
import { theme } from "../../../../../theme";

export default function Menu() {
  const {
    isAdmin,
    menu,
    productToEdit,
    activeTab,
    handleProductDelete,
    reloadMenu,
    titleEditBoxRef,
    setActiveTab,
    setIsPanelCollapsed,
    setProductToEdit,
    handleAddToBasket,
  } = useContext(OrderContext);

  const onDelete = (event, id) => {
    event.stopPropagation();
    handleProductDelete(id);
    focusTitleEditBox(titleEditBoxRef);
  };

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

  const onAdd = (e, id) => {
    e.stopPropagation();
    handleAddToBasket(id);
  };

  if (menu.length === 0)
    return <EmptyMenu isAdmin={isAdmin} reloadMenu={reloadMenu} />;

  return (
    <MenuStyled>
      {menu.map(({ id, imageSource, title, price }) => {
        return (
          <Card
            key={id}
            imageSource={imageSource ? imageSource : "/images/coming-soon.png"}
            title={title}
            leftDescription={formatPrice(price)}
            hasDeleteButton={isAdmin}
            onDelete={(e) => onDelete(e, id)}
            onClick={isAdmin ? () => selectProductToEdit(id) : null}
            onAdd={(e) => onAdd(e, id)}
            isHoverable={isAdmin}
            isSelected={isCardSelected(id)}
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
`;
