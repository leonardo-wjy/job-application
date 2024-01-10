/* eslint-disable react/prop-types */
import React from "react";

import CIcon from "@coreui/icons-react";
import { CButton, CSpinner } from "@coreui/react-pro";

import { MdCancel, MdAddBox, MdQrCodeScanner, MdSearch } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
import { BiPowerOff } from "react-icons/bi";
import {
  BsFillTrashFill,
  BsFileEarmarkPdfFill,
  BsArrowDownUp,
  BsArrowDown,
  BsArrowUp,
} from "react-icons/bs";
import { AiFillEdit, AiFillEye, AiFillPrinter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";

import colors from "src/utils/colors";

function ButtonAction({
  onClick,
  type,
  sortValue,
  isLoading,
  backgroundColor,
  className,
  isDisabled,

  // if you want custom text
  text,
}) {
  let icon = {
    text: "",
    textColor: "",
    backgroundColor: "",
    img: "",
  };

  if (type === "save") {
    icon = {
      text: "Save",
      textColor: colors.white,
      backgroundColor: colors.yellow,
      img: null,
    };
  } else if (type === "update") {
    icon = {
      text: "Update",
      textColor: colors.white,
      backgroundColor: colors.yellow,
      img: null,
    };
  } else if (type === "delete") {
    icon = {
      text: "Delete",
      textColor: colors.white,
      backgroundColor: colors.red,
      img: null,
    };
  } else if (type === "back") {
    icon = {
      text: "Back",
      textColor: colors.white,
      backgroundColor: colors.blue,
      img: null,
    };
  } else {
    icon = {
      text: "",
      textColor: "none",
      backgroundColor: "none",
    };
  }

  if (type === "sort") {
    return <>{icon.img}</>;
  }

  return (
    <CButton
      className={className}
      style={{
        width: icon.text && "150px",
        background: backgroundColor || icon.backgroundColor,
        boxShadow: "none",
        borderRadius: "0.2rem",
        display: "flex",
        alignItems: "center",
        padding: "0.3rem 0.5rem",
        marginLeft: 10
      }}
      onClick={onClick}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? <CSpinner color="light" size="sm" /> : icon.img}
      {icon.text && (
        <span
          className={`${icon.img && `ms-2`} m-auto`}
          style={{ color: icon.textColor }}
        >
          {text ? text : icon.text}
        </span>
      )}
    </CButton>
  );
}

export default ButtonAction;
