const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isOnline: true,
  msg: "",
};

const invoice = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STATUS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_STATUS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isOnline: true,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "UPDATE_STATUS_REJECTED":
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

export default invoice;
