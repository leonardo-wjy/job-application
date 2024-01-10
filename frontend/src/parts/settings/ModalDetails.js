/* eslint-disable */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
  CForm,
  CSpinner,
} from "@coreui/react-pro";
import ButtonAction from "src/components/button/ButtonAction";
import CostumInput from "src/components/costum-input/CostumInput";
import Swal from "sweetalert";
import UserAPI from "src/services/user";
import { useMutation, useQuery } from "react-query";
import ResponseError from "src/components/ResponseError";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ModalDetails({ idDetail, visible, onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      password: "",
      role: "",
      status: "",
    },
  });

  // GET
  const { isLoading: isLoadingUser } = useQuery(
    ["user", idDetail],
    () => UserAPI.getById({ id: idDetail }),
    {
      enabled: idDetail !== "",
      onSuccess: (res) => {
        const data = res.data;

        setValue("name", data.name);
        setValue("username", data.username);
        setValue("status", data.status);
      },
      onError: (err) => {
        ResponseError(err, dispatch, history);
      },
    }
  );

  return (
    <CModal scrollable visible={visible} onClose={onClose} size="lg">
      <div
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: "0.3rem",
          borderTopRightRadius: "0.3rem",
        }}
        className="d-flex justify-content-between align-items-center p-3"
      >
        <div className="d-flex align-items-center">
          <span className="form-title">
            <h3>Detail</h3>
          </span>
        </div>

        <div className="float-end">
          <ButtonAction type="cancel" onClick={onClose} />
        </div>
      </div>
      <CModalBody>
        <CForm>
          {idDetail && isLoadingUser ? (
            <CSpinner />
          ) : (
            <>
              <CRow>
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="Name"
                    name="name"
                    type="text"
                    disabled={true}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="username"
                    name="username"
                    type="text"
                    disabled={true}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="Status"
                    name="status"
                    type="text"
                    disabled={true}
                  />
                </CCol>
              </CRow>
            </>
          )}
        </CForm>
      </CModalBody>
    </CModal>
  );
}

export default ModalDetails;
