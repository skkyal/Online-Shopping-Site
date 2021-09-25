import axios from "axios";
const instance = axios.create({
  baseURL: "https://shopcart-app.herokuapp.com/",
});
export default instance;
