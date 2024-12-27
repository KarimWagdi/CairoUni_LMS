import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/question`;

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

export const getQuestions = async () => axios
    .get(`${baseURL}/get`)
    .catch((err) => console.log(err));

export const createQuestion = async ({text, surveyId}) => {
    try {
        const response = await getAxiosInstance().post('/create', { text, surveyId });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteQuestion = async (id) => {
    try {
        const response = await getAxiosInstance().delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateQuestion = async ({id, surveyId, text}) => {
    try {
        const response = await getAxiosInstance().put(`/update/${id}`, { surveyId, text});
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getQuestion = async (id) => {
    try {
        const response = await getAxiosInstance().get(`/get/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};