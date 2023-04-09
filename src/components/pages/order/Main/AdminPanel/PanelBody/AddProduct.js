import React, { useContext, useState } from "react";
import styled from "styled-components";
import ProductForm from "./ProductForm";
import OrderContext from "../../../../../../context/OrderContext";
import Button from "../../../../../reusable/Button";
import { FiCheck } from "react-icons/fi";
import { EMPTY_PRODUCT } from "../../../../../../js/enum";

export default function AddProduct() {
  const { menu, setMenu, productToAdd, setProductToAdd } =
    useContext(OrderContext);

  const [wasProductAdded, setWasProductAdded] = useState(false);

  const displaySuccessMessage = () => {
    setWasProductAdded(!wasProductAdded);
    setTimeout(() => {
      setWasProductAdded(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMenu([
      {
        ...productToAdd,
        id: crypto.randomUUID(),
      },
      ...menu,
    ]);
    displaySuccessMessage();
    setProductToAdd(EMPTY_PRODUCT);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProductToAdd({ ...productToAdd, [name]: value });
  };

  return (
    <AddProductStyled onSubmit={handleSubmit}>
      <ProductForm
        imageSource={productToAdd.imageSource}
        wasProductAdded={wasProductAdded}
        product={productToAdd}
        handleChange={handleFieldChange}
      />
      <div className="addSection">
        <Button
          className="submit-button"
          label={"Ajouter un nouveau produit au menu"}
          variant="add"
        />
        {wasProductAdded && (
          <span className="succesAdd">
            <FiCheck className="icon" /> Ajouté avec succès !
          </span>
        )}
      </div>
    </AddProductStyled>
  );
}

const AddProductStyled = styled.form`
  height: 100%;
  width: 70%;

  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  grid-template-rows: repeat(1fr, 1fr);

  .addSection {
    grid-area: 4 / 2 / -1 / -1;
    display: flex;
    align-items: center;
    position: relative;
    top: 3px;
    grid-row: 2;
    margin-left: 220px;

    .submit-button {
      height: 100%;
    }
  }
`;
