/* eslint-disable */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert";
import { primary } from "src/utils/styleReactSelect";
import "./costum-input.scss";
import {
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react-pro";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// TEXT, EMAIL, NUMBER, PASSWORD, DATE, SELECT, TEXTAREA, SEARCH, IMAGE
const CostumInput = ({
  register,
  label,
  name,
  disabled,

  // validation
  errors,
  isReqMsg,

  // length
  minLength,
  minLengthMsg,
  maxLength,
  maxLengthMsg,

  // pattern,
  pattern,
  patternMsg,

  // type (REQUIRED)
  type,

  // if for phone, then use this
  phone,

  // if for salary, then use this
  handleChangeSalary,

  // if type is SELECT, then use this
  controller: Controller,
  dataSelect,
  handleSelect,
  nameParent,
  control,
  isClearable,

  // if type is SEARCH, then use this
  placeholder,
  setSearch, //state
  setCurrentPage,
  refetch,
}) => {
  const [isPassword, setIsPassword] = useState(true);

  // for search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      refetch();
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file.size > 1048576) {
      Swal("Ukuran file terlalu besar, maksimal 1MB", "", "error");
    } else if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg"
    ) {
      Swal(
        "File format tidak sesuai, format yang diterima harus jpg, jpeg, png",
        "",
        "error"
      );
    } else if (file) {
      getBase64(file).then((data) => {
        setShowPhoto(URL.createObjectURL(file));
        setPhoto(data);
      });
    }
  };

  return (
    <div className="costum-input">
      <>{label && <CFormLabel>{label}</CFormLabel>}</>
      {isReqMsg ? (
        <CFormLabel style={{ color: "red", marginLeft: "5px" }}>*</CFormLabel>
      ) : null}

      {type === "text" ||
      type === "email" ||
      type === "number" ||
      type === "date" ? (
        <div>
          <CFormInput
            autoComplete="one-time-code"
            // className="costum-input-input"
            className="form-input"
            placeholder={placeholder}
            disabled={disabled}
            {...register(name, {
              required: isReqMsg,
              minLength: {
                value: minLength,
                message: minLengthMsg,
              },
              maxLength: {
                value: maxLength,
                message: maxLengthMsg,
              },
              pattern: {
                value:
                  type === "email"
                    ? /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    : pattern,
                message: patternMsg,
              },
            })}
            type={
              isPassword && type === "password"
                ? "password"
                : type === "date"
                ? "date"
                : "text"
            }
            onKeyPress={
              type === "number" || phone
                ? (e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                : null
            }
            onKeyDown={type === "date" ? (e) => e.preventDefault() : null}
          />
        </div>
      ) : (
        <></>
      )}

      {/* IF TYPE SALARY */}
      {type === "salary" && (
        <CInputGroup className="mb-3">
          <CInputGroupText id="basic-addon1">Rp</CInputGroupText>
          <CFormInput
            autoComplete="one-time-code"
            // className="costum-input-input"
            className="form-input"
            placeholder={placeholder}
            disabled={disabled}
            {...register(name, {
              required: isReqMsg,
            })}
            onChange={handleChangeSalary}
            type="text"
            onKeyPress={(e) => {
              if (!/[0-9.]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </CInputGroup>
      )}

      {/* IF TYPE PASSWORD */}
      {type === "password" && (
        <div>
          <CInputGroup>
            <CFormInput
              autoComplete="one-time-code"
              // className="costum-input-input"
              className="form-input"
              placeholder={placeholder}
              {...register(name, {
                required: isReqMsg,
                minLength: {
                  value: minLength,
                  message: minLengthMsg,
                },
                maxLength: {
                  value: maxLength,
                  message: maxLengthMsg,
                },
              })}
              type={isPassword && type === "password" ? "password" : "text"}
            />

            {type === "password" && (
              <CInputGroupText
                style={{
                  background: "none",
                  borderLeft: "none",
                  cursor: "pointer",
                }}
                className="form-input"
                onClick={() => setIsPassword((currentValue) => !currentValue)}
              >
                {isPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </CInputGroupText>
            )}
          </CInputGroup>
        </div>
      )}

      {/* IF TYPE SEARCH */}
      {type === "search" && (
        <CFormInput
        autoComplete="one-time-code"
          className="form-input"
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
          onChange={handleSearch}
        />
      )}

      {/* IF TYPE TEXTAREA */}
      {type === "textarea" && (
        <CFormTextarea
          className="form-input"
          disabled={disabled}
          rows={4}
          {...register(name, {
            required: isReqMsg,
            minLength: {
              value: minLength,
              message: minLengthMsg,
            },
            maxLength: {
              value: maxLength,
              message: maxLengthMsg,
            },
          })}
        />
      )}

      {/* IF TYPE SELECT */}
      {type === "select" && (
        <Controller
          render={({ field }) => (
            <Select
              {...register(name, {
                required: isReqMsg,
              })}
              {...field}
              styles={primary}
              options={dataSelect}
              onChange={handleSelect}
              isClearable={isClearable}
              placeholder={placeholder}
              //value={name}
            />
          )}
          name={nameParent}
          control={control}
        />
      )}

      {/* MSG ERRORS */}
      {type === "select" && errors ? (
        <p style={{ color: "#e55353", fontSize: "13px", marginTop: "5px" }}>
          {errors[nameParent]?.value && errors[nameParent]?.value?.message}
        </p>
      ) : type !== "select" && errors ? (
        <p style={{ color: "#e55353", fontSize: "13px", marginTop: "5px" }}>
          {errors[name] && errors[name]?.message}
        </p>
      ) : null}
    </div>
  );
};

export default CostumInput;
