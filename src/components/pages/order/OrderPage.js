import styled from "styled-components";
import { theme } from "../../../theme";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";
import { useRef, useState } from "react";
import OrderContext from "../../../context/OrderContext";
import { fakeMenu } from "../../../fakeData/fakeMenu";

const EMPTY_PRODUCT = {
  id: "",
  title: "",
  imageSource: "",
  price: "",
};

export default function OrderPage() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("add");
  const [menu, setMenu] = useState(fakeMenu.SMALL);
  const [productToAdd, setProductToAdd] = useState(EMPTY_PRODUCT);

  const titleEditBoxRef = useRef();

  const orderContextValue = {
    isAdmin,
    setIsAdmin,
    isPanelCollapsed,
    setIsPanelCollapsed,
    activeTab,
    setActiveTab,
    menu,
    setMenu,
    productToAdd,
    setProductToAdd,
    productToEdit,
    setProductToEdit,
    titleEditBoxRef,
  };

  return (
    <OrderPageStyled>
      <OrderContext.Provider value={orderContextValue}>
        <div className="container">
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

  .container {
    height: 95vh;
    width: 1400px;
  }
`;
