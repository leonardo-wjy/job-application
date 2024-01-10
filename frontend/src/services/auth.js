import API from "../utils/axios";

const Auth = {
  login: async (params) => {
    const { data } = await API.post("user/login", params);
    return data;
  },
  signup: async (params) => {
    const { data } = await API.post("user/register", params);
    return data;
  },
};

export default Auth;
