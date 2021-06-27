const initialState = {
  keywords: "",
};

const keywords = (state = initialState, action) => {
  switch (action.type) {
    case "KEYWORDS": {
      return {
        ...initialState,
        keywords: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default keywords;
