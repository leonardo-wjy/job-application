/* eslint-disable */
import API from "../utils/axios";

const UserAPI = {
  getAll: async ({ sortField, sortType, search, currentPage, pageSize }) => {
    const { data } = await API.get(
      `user/pagination?sort=${sortField}&sortType=${sortType}&pageSize=${pageSize}&currentPage=${currentPage}&search=${search}`
    );
    return data;
  },

  create: async (params) => {
    const { data } = await API.post("user/register", params);
    return data;
  },

  getById: async ({ id }) => {
    const { data } = await API.get(`user/${id}`);
    return data;
  },

  update: async ({ id, params }) => {
    const { data } = await API.patch(`user/update/${id}`, params);
    return data;
  },

  updateStatus: async ({ id }) => {
    const { data } = await API.patch(`user/status/${id}`);
    return data;
  },
};

export default UserAPI;
