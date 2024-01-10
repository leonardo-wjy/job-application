import axios from "axios";
import { store } from "src/store";

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;

    if (token) {
      config.headers["access_token"] = `${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response?.data.hasOwnProperty("new_token")) {
      // store.dispatch(() => ({ token: response?.data?.new_token }));
      // console.log("SET TOKEN ", response.data.new_token);
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
