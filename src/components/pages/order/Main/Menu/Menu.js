import React, { useContext } from "react";
import styled from "styled-components";
import Card from "../../../../reusable/Card";
import { formatPrice } from "../../../../../utils/maths";
import OrderContext from "../../../../../context/OrderContext";
import EmptyMenu from "./EmptyMenu";
import { fakeMenu } from "../../../../../fakeData/fakeMenu";

export default function Menu() {
  const {
    isAdmin,
    menu,
    setMenu,
    productToEdit,
    setProductToEdit,
    setIsPanelCollapsed,
    setActiveTab,
    titleEditBoxRef,
    activeTab,
  } = useContext(OrderContext);

  const handleDelete = (id) => {
    const newMenu = menu.filter((item) => item.id !== id);
    setMenu(newMenu);
    if (productToEdit && productToEdit.id === id) {
      setProductToEdit();
    }
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    handleDelete(id);
    activeTab === "edit" &&
      menu.length &&
      productToEdit &&
      titleEditBoxRef.current.focus();
  };

  const selectProductToEdit = async (id) => {
    const product = menu.find((item) => item.id === id);
    await setProductToEdit(product);
    await setIsPanelCollapsed(false);
    await setActiveTab("edit");

    titleEditBoxRef.current.focus();
  };

  const reloadMenu = () => {
    setMenu(fakeMenu.SMALL);
  };

  const isCardActive = (id) => {
    return productToEdit && activeTab === "edit" && productToEdit.id === id;
  };

  return (
    <MenuStyled>
      {menu.length ? (
        menu.map(({ id, imageSource, title, price }) => {
          return (
            <Card
              key={id}
              imageSource={
                imageSource ? imageSource : "/images/coming-soon.png"
              }
              title={title}
              leftDescription={formatPrice(price)}
              hasDeleteButton={isAdmin}
              onDelete={(e) => onDelete(e, id)}
              onClick={isAdmin ? () => selectProductToEdit(id) : null}
              onAdd={(e) => e.stopPropagation()}
              isActive={isCardActive(id)}
            />
          );
        })
      ) : (
        <EmptyMenu isAdmin={isAdmin} reloadMenu={reloadMenu} />
      )}
    </MenuStyled>
  );
}

const MenuStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  grid-row-gap: 60px;
  grid-column-gap: 5px;
  min-height: 83%;
  background: none;
  padding: 50px 50px 150px;
  overflow-y: scroll;
`;
