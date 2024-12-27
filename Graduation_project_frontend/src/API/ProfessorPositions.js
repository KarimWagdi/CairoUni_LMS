import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/professor_positions`;

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

export const getByProfessorId = async (id) => {
  try {
    const response = await getAxiosInstance().get(
      `${baseURL}/getByProfessorId/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching professor researches:", error);
    throw error;
  }
};

export const create = async (data) => {
  try {
    console.log(data);
    const response = await getAxiosInstance().post(`${baseURL}/create`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating professor research:", error);
    throw error;
  }
}

export const deleteById = async (id) => {
  try {
    const response = await getAxiosInstance().delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting professor research:", error);
    throw error;
  }
}
