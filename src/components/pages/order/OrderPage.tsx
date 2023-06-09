import styled from "styled-components";
import { theme } from "../../../theme";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";
import React, { useLayoutEffect, useRef, useState } from "react";
import OrderContext from "../../../context/OrderContext";
import { EMPTY_PRODUCT, TABS } from "../../../ts/enum";
import { focusTitleEditBox } from "../../../utils/ref";
import { useMenu } from "../../../hooks/useMenu";
import { useBasket } from "../../../hooks/useBasket";
import { isProductSelected, findObjectById } from "../../../utils/array";
import { useParams } from "react-router-dom";
import bgPattern from "../../../assets/images/bgPattern.svg";
import { orderPageInitData } from "../../../hooks/useInitOrderPage";
import { useModal } from "../../../hooks/useModal";
import OrderConfirmed from "./modals/OrderConfirmed/OrderConfirmed";
import { Product } from "../../../utils/interfaces";

export default function OrderPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.ADD);
  const [productToAdd, setProductToAdd] = useState(EMPTY_PRODUCT);
  const [productToEdit, setProductToEdit] = useState({} as Product);
  const { username } = useParams();
  const [userName, setUserName] = useState(username);
  const [isLoading, setIsLoading] = useState(false);
  const menuContent = useMenu(userName || "");
  const basketContent = useBasket(userName || "");
  const modalContent = useModal();

  const titleEditBoxRef = useRef<HTMLInputElement>(null);

  const selectProductToEdit = async (id: string) => {
    const product = (await findObjectById(id, menuContent.menu)) as Product;
    if (!product) return console.log("Product not found");
    await setProductToEdit(product);
    await setActiveTab(TABS.EDIT);
    await setIsPanelCollapsed(false);

    focusTitleEditBox(titleEditBoxRef);
  };

  const isCardSelected = (id: string) => {
    if (activeTab === "add" || !productToEdit) return false;
    const productSelected: Boolean = isProductSelected(id, productToEdit.id);
    return productSelected ? true : false;
  };

  const orderContextValue = {
    isAdmin,
    setIsAdmin,
    isPanelCollapsed,
    setIsPanelCollapsed,
    activeTab,
    setActiveTab,
    productToAdd,
    setProductToAdd,
    productToEdit,
    setProductToEdit,
    titleEditBoxRef,
    isCardSelected,

    selectProductToEdit,

    ...menuContent,
    ...basketContent,
    ...modalContent,

    isLoading,
  };

  const initializeOrderPage = async () => {
    if (userName) {
      setIsLoading(true);
      const data = await orderPageInitData(userName);
      await menuContent.setMenu(data.menu);
      await basketContent.setBasket(data.basket);
      await setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    initializeOrderPage();
  }, [userName]);

  return (
    <OrderPageStyled>
      <OrderContext.Provider value={orderContextValue}>
        <div className="container">
          {modalContent.wasOrderConfirmed && <OrderConfirmed />}
          <Navbar />
          <Main />
        </div>
      </OrderContext.Provider>
    </OrderPageStyled>
  );
}

const OrderPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.colors.primary};
  background-image: url(${bgPattern});
  background-size: 55px;
  background-repeat: repeat;
  background-position: center;

  .container {
    height: 95vh;
    width: 1400px;
    width: 80vw;
  }
`;
