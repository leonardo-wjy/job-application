/* eslint-disable */
import API from "../utils/axios";

const formAPI = {
  getAll: async ({ sortField, sortType, search, currentPage, pageSize }) => {
    const { data } = await API.get(
      `form/all?sort=${sortField}&sortType=${sortType}&pageSize=${pageSize}&currentPage=${currentPage}&search=${search}`
    );
    return data;
  },
  getById: async ({id}) => {
    const { data } = await API.get(`form/id/${id}`);
    return data;
  },
  create: async ({id, params}) => {
    const { data } = await API.post(`form/${id}`, params);
    return data;
  },
};

export default formAPI;
