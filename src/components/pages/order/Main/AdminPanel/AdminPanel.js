import React from "react";
import styled from "styled-components";
import { theme } from "../../../../../theme";
import PanelBody from "./PanelBody";
import PanelTabs from "./PanelTabs";

export default function AdminPanel() {
  return (
    <AdminPanelStyled>
      <PanelTabs />
      <PanelBody />
    </AdminPanelStyled>
  );
}

const AdminPanelStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4fr;
  width: 1400px;
  height: 293px;
  position: absolute;
  align-self: flex-end;
  border-bottom-left-radius: ${theme.borderRadius.extraRound};
  border-bottom-right-radius: ${theme.borderRadius.extraRound};
`;