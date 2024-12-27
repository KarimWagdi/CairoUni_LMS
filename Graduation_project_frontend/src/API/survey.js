import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/survey`;

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

export const getSurveys = async () => axios
    .get(`${baseURL}/get`)
    .catch((err) => console.log(err));

export const createSurvey = async (name) => {
    try {
        const response = await getAxiosInstance().post('/create', { name });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteSurvey = async (id) => {
    try {
        const response = await getAxiosInstance().delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateSurvey = async (id, name) => {
    try {
        const response = await getAxiosInstance().put(`/update/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getSurvey = async (id) => {
    try {
        const response = await getAxiosInstance().get(`/get/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
