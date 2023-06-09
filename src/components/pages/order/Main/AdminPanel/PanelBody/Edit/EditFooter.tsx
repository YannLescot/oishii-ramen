import React from "react";
import styled from "styled-components";
import { theme } from "../../../../../../../theme";
import UpdateMessage from "../../../../../../reusable/UpdateMessage";
import { BsCloudCheck } from "react-icons/bs";

interface EditFooterProps {
  wasProductEdited: boolean;
}

export default function EditFooter({ wasProductEdited }: EditFooterProps) {
  if (wasProductEdited)
    return (
      <EditFooterStyled>
        <UpdateMessage
          label="Modifications enregistrées !"
          Icon={<BsCloudCheck className="icon" />}
          color={theme.colors.blue}
          isDisplayed={wasProductEdited}
        />
      </EditFooterStyled>
    );

  return (
    <EditFooterStyled>
      <span>
        Cliquer sur un produit du menu pour le modifier{" "}
        <span className="decorated">en temps réel</span>
      </span>
    </EditFooterStyled>
  );
}

const EditFooterStyled = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.primary};
  font-size: ${theme.font.sizes.SM};
  height: 38px;

  span {
    .decorated {
      display: inline;
      text-decoration: underline;
    }
  }

  .icon {
    font-size: ${theme.font.sizes.P2};
    margin-left: 0px;
  }
`;
