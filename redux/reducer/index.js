import { combineReducers } from "redux";

import auth from "./auth";
import keywords from "./keywords";
import product from "./product";
import promo from "./promo";
import invoice from "./invoice";

export default combineReducers({
  auth,
  keywords,
  product,
  promo,
  invoice,
});
