import axios from "axios";
import * as config from "./ApiConfig";
const baseURL =  `${config.API_URL}/answer`;

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

export const getAnswers = async () => axios
    .get(`${baseURL}/get`)
    .catch((err) => console.log(err));

export const createAnswer = async ({text, questionId}) => {
    try {
        const response = await getAxiosInstance().post('/create', { text, questionId });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteAnswer = async (id) => {
    try {
        const response = await getAxiosInstance().delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateAnswer = async ({id, questionId, text}) => {
    try {
        const response = await getAxiosInstance().put(`/update/${id}`, { questionId, text});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAnswer = async (id) => {
    try {
        const response = await getAxiosInstance().get(`/get/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};