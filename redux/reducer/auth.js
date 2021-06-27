const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isOnline: true,
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "LOGIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isOnline: true,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "LOGIN_REJECTED":
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

export default auth;
