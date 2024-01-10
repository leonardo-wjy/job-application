import {
  CCol,
  CContainer,
  CForm,
  CLoadingButton,
  CRow,
} from "@coreui/react-pro";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import ResponseError from "src/components/ResponseError";
import Auth from "../../../services/auth";
import colors from "../../../utils/colors";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/userSlice";
import CostumInput from "src/components/costum-input/CostumInput";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  const { isLoading, mutate: postLogin } = useMutation(Auth.login, {
    onSuccess: (res) => {
      dispatch(
        setUser({
          data: res.data,
          // permission: res.menu,
          token: res.token,
        })
      );
      history.push("/home");
    },
    onError: (err) => {
      ResponseError(err, dispatch, history);
    },
  });

  const onSubmit = (data) => {
    postLogin(data);
  };

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ background: colors.background }}
    >
      <CContainer>
        {/* FORM */}
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CContainer>
              <CForm onSubmit={handleSubmit(onSubmit)}>
                <CostumInput
                  register={register}
                  label="Email"
                  name="email"
                  errors={errors}
                  isReqMsg="Email is required"
                  placeholder="Input your email"
                  type="email"
                  patternMsg="Email is not valid"
                />

                <CostumInput
                  register={register}
                  label="Password"
                  name="password"
                  errors={errors}
                  isReqMsg="Password is required"
                  type="password"
                  placeholder="Input your password"
                />

                <CLoadingButton
                  style={{ width: "100%", background: colors.yellow }}
                  className="py-2 fw-semibold mt-4"
                  type="submit"
                  loading={isLoading}
                  disabledOnLoading={true}
                >
                  Login
                </CLoadingButton>
                {/* Link for users who already have an account */}
                <p className="mt-3">
                    Don't have an account?{" "}
                    <a href="/signup" style={{ color: colors.yellow }}>
                        Click here
                    </a>
                </p>

              </CForm>
            </CContainer>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Login;
