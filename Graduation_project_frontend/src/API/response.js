import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/responses`;

const getAxiosInstance = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getResponses = async () => axios
    .get(`${baseURL}/get`)
    .catch((err) => console.log(err));

export const createResponse = async (answerId) => {
    try {
        const response = await getAxiosInstance().post(`/create`, { answerId });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteResponse = async (id) => {
    try {
        const response = await getAxiosInstance().delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await getAxiosInstance().get(`/get/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

