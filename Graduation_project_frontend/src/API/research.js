import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/research`;

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

export const getProfessorResearches = async (id) => {
  try {
    const response = await getAxiosInstance().get(
      `${baseURL}/getResearchByAuthorIdORsupervisorId/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching professor researches:", error);
    throw error;
  }
};

export const getResearch = async (id) => {
  try {
    const response = await getAxiosInstance().get(`${baseURL}/getById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching research by ID:", error);
    throw error;
  }
};

export const deleteResearch = async (id) => {
  try {
    const response = await getAxiosInstance().delete(`${baseURL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting research:", error);
    throw error;
  }
};

export const updateResearch = async (
  id,
  title,
  description,
  startDate,
  endDate,
  status,
  createdBy,
  pagesNumper,
  publisher,
  magazinName,
  magazinVolume,
  publishYear,
  majoring,
  professorRole,
  type,
  departmentId,
  masterStudentCode
) => {
  try {
    const response = await getAxiosInstance().put(`${baseURL}/update/${id}`, {
      title,
      description,
      startDate,
      endDate,
      status,
      createdBy,
      pagesNumper,
      publisher,
      magazinName,
      magazinVolume,
      publishYear,
      majoring,
      professorRole,
      type,
      departmentId,
      masterStudentCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating research:", error);
    throw error;
  }
};

export const createResearch = async ({
  title,
  description,
  startDate,
  endDate,
  status,
  createdBy,
  pagesNumber,
  publisher,
  magazineName,
  magazineVolume,
  publishYear,
  majoring,
  ProfessorRole,
  type,
}) => {
  try {
    const response = await getAxiosInstance().post(`${baseURL}/create`, {title, description, startDate, endDate, status, createdBy, pagesNumber, publisher, magazineName, magazineVolume, publishYear, majoring, ProfessorRole, type});
    return response.data;
  } catch (error) {
    console.error("Error creating research:", error);
    throw error;
  }
};
