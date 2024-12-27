import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/auth`

export const login = async (email, password) => axios
.post(`${baseURL}/login`, { email, password })
.catch((err) => console.log(err));

export const register = async (fullName, email, password, departmentId) => axios
.post(`${baseURL}/createUser`, {
  fullName,
  email,
  password,
  departmentId
})
.catch((err) => {
  console.error("Error:", err);
});