/* eslint-disable */
import API from "../utils/axios";

const formAPI = {
  getById: async ({id}) => {
    const { data } = await API.get(`form/${id}`);
    return data;
  },
  create: async ({id, params}) => {
    const { data } = await API.post(`form/${id}`, params);
    return data;
  },
};

export default formAPI;
