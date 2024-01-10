/* eslint-disable */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
  CRow,
  CForm,
  CSpinner,
} from "@coreui/react-pro";
import ButtonAction from "src/components/button/ButtonAction";
import CostumInput from "src/components/costum-input/CostumInput";
import Swal from "sweetalert";
import { useMutation, useQuery } from "react-query";
import ResponseError from "src/components/ResponseError";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserAPI from "src/services/user";

function Modals({
  idEdit,
  visible,
  onClose,
  isLoading,
  setShowModal,
  refetch,
}) {
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
    },
  });

  useEffect(() => {
    setValue("name", "");
    setValue("username", "");
    setValue("password", "");
  }, [visible]);

  // GET
  const { isLoading: isLoadingGetUser } = useQuery(
    ["user-by-id", idEdit],
    () => UserAPI.getById({ id: idEdit }),
    {
      enabled: idEdit !== "",
      onSuccess: (res) => {
        const data = res.data;

        setValue("name", data.name);
        setValue("username", data.username);
      },
      onError: (err) => {
        ResponseError(err, dispatch, history);
      },
    }
  );

  // CREATE
  const { isLoading: isLoadingCreateUser, mutate: createUser } = useMutation(
    UserAPI.create,
    {
      onSuccess: (res) => {
        Swal(res.message, "", "success");
        setValue("name", "");
        setValue("username", "");
        setValue("password", "");
        refetch();
        setShowModal(false);
      },
      onError: (err) => {
        ResponseError(err, dispatch, history);
      },
    }
  );

  // UPDATE
  const { isLoading: isLoadingUpdateUser, mutate: updateUser } = useMutation(
    UserAPI.update,
    {
      onSuccess: (res) => {
        Swal(res.message, "", "success");
        setValue("name", "");
        setValue("username", "");
        setValue("password", "");
        refetch();
        setShowModal(false);
      },
      onError: (err) => {
        ResponseError(err, dispatch, history);
      },
    }
  );

  const onSubmit = (data) => {
    Swal("Save data?", {
      icon: "warning",
      dangerMode: true,
      buttons: {
        discard: {
          text: "Cancel",
          value: false,
        },
        save: {
          text: "Save",
          value: true,
        },
      },
    }).then((result) => {
      if (result) {
        if (idEdit) {
          let newData = {
            name: data.name,
          };

          if (data.password) {
            newData = {
              ...newData,
              password: data.password,
            };
          }
          updateUser({ id: idEdit, params: newData });
        } else {
          let newData = {
            name: data.name,
            username: data.username,
            password: data.password,
          };
          createUser(newData);
        }
      }
    });
  };

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
            <h3>Add New</h3>
          </span>
        </div>

        <div className="float-end">
          <ButtonAction type="cancel" onClick={onClose} />
        </div>
      </div>
      <CModalBody>
        <CForm>
          {idEdit && isLoadingGetUser ? (
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
                    errors={errors}
                    isReqMsg="Required"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}></CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="Username"
                    name="username"
                    type="text"
                    disabled={idEdit && "true"}
                    errors={errors}
                    isReqMsg="Required"
                    patternMsg="username is not valid"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={12}>
                  <CostumInput
                    register={register}
                    label="Password"
                    name="password"
                    errors={errors}
                    isReqMsg={idEdit ? "" : "Required"}
                    type="password"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="float-end mt-3">
                    <ButtonAction
                      type={"save"}
                      onClick={handleSubmit(onSubmit)}
                      isLoading={isLoadingCreateUser}
                    />
                  </div>
                </CCol>
              </CRow>
            </>
          )}
        </CForm>
      </CModalBody>
    </CModal>
  );
}

export default Modals;
