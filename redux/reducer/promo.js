const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isOnline: true,
  msg: "",
};

const promo = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROMO_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_PROMO_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isOnline: true,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_PROMO_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "POST_PROMO_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_PROMO_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isOnline: true,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "POST_PROMO_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_PROMO_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_PROMO_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isOnline: true,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "UPDATE_PROMO_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "DELETE_PROMO_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_PROMO_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isOnline: true,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "DELETE_PROMO_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default promo;
