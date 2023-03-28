import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../../theme";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import ToggleButton from "../../../reusable/ToggleButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminModeToast from "./AdminModeToast";

export default function NavbarRightSide() {
  const { username } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);

  const displayToastNotification = () => {
    setIsAdmin(!isAdmin);

    !isAdmin &&
      toast.info("Mode admin activé", {
        theme: "dark",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };

  return (
    <NavbarRightSideStyled>
      <AdminModeToast />
      <ToggleButton
        isChecked={isAdmin}
        onToggle={displayToastNotification}
        labelIfChecked="DÉSACTIVER LE MODE ADMIN"
        labelIfUnchecked="ACTIVER LE MODE ADMIN"
      />
      <UserProfile username={username} />
    </NavbarRightSideStyled>
  );
}

const NavbarRightSideStyled = styled.div`
  gap: ${theme.spacing.xl};
  padding-right: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
