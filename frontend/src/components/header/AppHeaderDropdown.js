import React from "react";
import { cilAccountLogout, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react-pro";

import Swal from "sweetalert";
import colors from "src/utils/colors";
import defaultProfile from "../../assets/images/avatars/default-profile.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/userSlice";
import DefaultUser from "src/assets/images/avatars/default-profile.png";

const AppHeaderDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const onLogout = () => {
    Swal("Yakin ingin keluar?", {
      dangerMode: true,
      cancel: true,
      buttons: true,
      icon: "info",
    }).then((result) => {
      if (result) {
        dispatch(removeUser());
        history.push("/");
      }
    });
  };

  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <span className="pe-4" style={{ color: colors.black }}>
          Welcome, {user.role || "User"}
        </span>
        <CAvatar src={user.photo || DefaultUser} size="md" />
      </CDropdownToggle>

      <CDropdownMenu>
        {/* <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          My Profile
        </CDropdownItem> */}
        <CDropdownItem style={{ cursor: "pointer" }} onClick={onLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
