import React from "react";
import styled, { css } from "styled-components";
import { theme } from "../../theme";
import { MdDeleteForever } from "react-icons/md";

export default function BasketCard({
  imageSource,
  title,
  price,
  quantity,
  onDelete,
  isHoverable,
  isSelected,
  onClick,
}) {
  return (
    <BasketCardStyled
      isHoverable={isHoverable}
      isSelected={isSelected}
      onClick={onClick}
    >
      <img src={imageSource} alt="produit" />
      <div className="description">
        <div className="title">{title}</div>
        <div className="prix">{price}</div>
      </div>
      <div className="quantity">x{quantity}</div>
      <button className="delete" onClick={onDelete}>
        <MdDeleteForever />
      </button>
    </BasketCardStyled>
  );
}

const BasketCardStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  box-sizing: border-box;
  width: 90%;
  height: 85px;
  padding: 8px 16px;
  margin: 20px 0;
  border-radius: ${theme.borderRadius.extraRound};
  overflow: hidden;

  background-color: ${theme.colors.background_white};
  box-shadow: ${theme.shadows.medium};
  position: relative;

  ${({ isHoverable }) => isHoverable && hoverableStyle}

  img {
    width: 85px;
    height: 60px;

    object-fit: contain;
  }

  .description {
    margin-left: 14px;

    .title {
      max-width: 100px;
      font-size: ${theme.font.sizes.P3};
      line-height: 32px;
      font-family: ${theme.font.families.stylish};
      font-weight: ${theme.font.weights.bold};
      //Make it display one line only
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .prix {
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.SM};
    }
  }

  .quantity {
    color: ${theme.colors.primary};
  }

  .delete {
    display: none;
  }

  &:hover {
    .delete {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 68px;
      background-color: ${theme.colors.red};
      border: none;
      font-size: ${theme.font.sizes.P3};
      color: ${theme.colors.white};
    }
  }

  ${({ isHoverable, isSelected }) => isHoverable && isSelected && selectedStyle}
`;

const hoverableStyle = css`
  &:hover {
    transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: ${theme.shadows.medium}, 0 0 10px 0.1px ${theme.colors.primary};
  }
`;

const selectedStyle = css`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};

  .description {
    .title {
      color: black;
    }

    .prix {
      color: ${theme.colors.white};
    }
  }

  .quantity {
    color: ${theme.colors.white};
  }
`;