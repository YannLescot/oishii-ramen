import { createContext } from "react";

export default createContext({
  isAdmin: false,
  setIsAdmin: () => {},
  isPanelCollapsed: false,
  setIsPanelCollapsed: () => {},
  activeTab: "",
  setActiveTab: () => {},
  productToAdd: {},
  setProductToAdd: () => {},
  productToEdit: {},
  setProductToEdit: () => {},
  titleEditBoxRef: {},

  selectProductToEdit: () => {},
  verifyIfCardIsSelected: () => {},

  menu: [],
  handleProductEdited: () => {},
  handleProductDelete: () => {},
  handleProductAdd: () => {},
  reloadMenu: () => {},

  basket: [],
  handleAddToBasket: () => {},
  handleRemoveFromBasket: () => {},
  isProductInBasket: () => {},
});
