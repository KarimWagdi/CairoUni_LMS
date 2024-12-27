import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/resetPassword`;

export const sendResetToken = async (email) => {
    try {
        const response = await axios.post(`${baseURL}/sendResetToken`, { email });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const validateResetToken = async (email, resetToken) => {
    try {
        const response = await axios.post(`${baseURL}/validateResetToken`, { email, resetToken });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const resetPassword = async (email, password) => {
    try {
        const response = await axios.post(`${baseURL}/resetPassword`, { email, password });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
