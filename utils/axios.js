import axios from "axios";
import Cookies from "js-cookie";

const axiosApiIntances = axios.create({
  baseURL: process.env.BASE_URL,
});

export default axiosApiIntances;
