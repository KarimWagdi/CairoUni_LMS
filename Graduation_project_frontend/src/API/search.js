import axios from "axios";
import * as config from "./ApiConfig";

const baseURL =`${config.API_URL}/search`;

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

export const search = async (query) => {
    try {
        const response = await getAxiosInstance().get(`/get?query=${query}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}