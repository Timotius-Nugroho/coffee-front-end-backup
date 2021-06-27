import axiosApiIntances from "../../utils/axios";

export const getAllPromo = (token, limit, page) => {
  return {
    type: "GET_ALL_PROMO",
    payload: axiosApiIntances.get(`promo?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};
export const getPromo = (id, token) => {
  return {
    type: "GET_PROMO",
    payload: axiosApiIntances.get(`/promo/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};
export const postPromo = (data, token) => {
  return {
    type: "POST_PROMO",
    payload: axiosApiIntances.post("/promo", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};
export const updatePromo = (id, data, token) => {
  return {
    type: "UPDATE_PROMO",
    payload: axiosApiIntances.patch(`/promo/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};
export const deletePromo = (id, token) => {
  return {
    type: "DELETE_PROMO",
    payload: axiosApiIntances.delete(`/promo/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
  };
};
