import axiosApiIntances from "../../utils/axios";

export const getUser = (id, token) => {
  return {
    type: "GET_USER",
    payload: axiosApiIntances.get(`/user/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};

export const updateUser = (id, data, token) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch(`/user/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};

export const changePassword = (id, data, token) => {
  return {
    type: "CHANGE_PASSWORD",
    payload: axiosApiIntances.patch(`/user/change-password/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};

export const deleteImage = (id, token) => {
  return {
    type: "DELETE_IMAGE",
    payload: axiosApiIntances.get(`/user/delete-image/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};
