import { useState } from "react";
import { deepClone, findObjectById, removeObjectById } from "../utils/array";
import { storeLocally } from "../utils/window";

export const useBasket = (userName) => {
  const [basket, setBasket] = useState([]);

  const handleAddToBasket = (productID) => {
    const basketCopy = deepClone(basket);
    const productInBasket = findObjectById(productID, basketCopy);

    if (productInBasket) {
      incrementProductQuantity(productInBasket, basketCopy);
      setBasket(basketCopy);
      storeLocally(userName, "basket", basketCopy);
      return;
    }

    addProductToBasket(productID, basketCopy);
  };

  const addProductToBasket = (productId, basketCopy) => {
    const newBasketProduct = { id: productId, quantity: 1 };
    const newBasket = [newBasketProduct, ...basketCopy];
    setBasket(newBasket);
    storeLocally(userName, "basket", newBasket);
  };

  const incrementProductQuantity = (product) => {
    setBasket((prevBasket) => {
      const basketCopy = deepClone(prevBasket);
      const productInBasket = findObjectById(product.id, basketCopy);
      productInBasket.quantity++;
      storeLocally(userName, "basket", basketCopy);
      return basketCopy;
    });
  };

  const decrementProductQuantity = (product) => {
    setBasket((prevBasket) => {
      const basketCopy = deepClone(prevBasket);
      const productInBasket = findObjectById(product.id, basketCopy);
      productInBasket.quantity--;
      storeLocally(userName, "basket", basketCopy);
      return basketCopy;
    });
  };

  const handleRemoveFromBasket = (productID) => {
    const basketCopy = deepClone(basket);

    const newBasket = removeObjectById(productID, basketCopy);
    setBasket(newBasket);
    storeLocally(userName, "basket", newBasket);
  };

  const handleEmptyBasket = () => {
    setBasket([]);
    storeLocally(userName, "basket", []);
  };

  return {
    basket,
    setBasket,
    handleAddToBasket,
    handleRemoveFromBasket,
    handleEmptyBasket,
    incrementProductQuantity,
    decrementProductQuantity,
  };
};
