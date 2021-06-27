import axiosApiIntances from "../../utils/axios";

export const getOrder = (id, token) => {
  return {
    type: "GET_ORDER",
    payload: axiosApiIntances.get(`/order/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};

export const deleteOrder = (id, token) => {
  return {
    type: "DELETE_ORDER",
    payload: axiosApiIntances.delete(`/order/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};
