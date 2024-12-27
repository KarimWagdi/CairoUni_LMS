import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/project`;

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

export const getProjects = async () => {
  try {
    const response = await getAxiosInstance().get();
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await getAxiosInstance().get(`/getProjectsById/${id}`);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const updateProject = async ({
  id,
  projectName,
  description,
  createdBy,
  topic,
  status,
  startDate,
  endDate,
  ProfessorRole,
  type,
  departmentId,
  affiliate,
  professorId
}) => {
  try {
    const response = await getAxiosInstance().put(`/update/${id}`, {
      projectName,
      description,
      createdBy,
      topic,
      status,
      startDate,
      endDate,
      ProfessorRole,
      type,
      departmentId,
      affiliate,
      professorId
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProject = async (
  projectName,
  description,
  createdBy,
  topic,
  status,
  startDate,
  endDate,
  ProfessorRole,
  type,
  departmentId,
  affiliate,
  professorId
) => {
  try {
    const response = await getAxiosInstance().post(`${baseURL}/create`, {
      projectName,
      description,
      createdBy,
      topic,
      status,
      startDate,
      endDate,
      ProfessorRole,
      type,
      departmentId,
      affiliate,
      professorId
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getProfessorProjects = async (id) => {
  try {
    const response = await getAxiosInstance().get(
      `${baseURL}/getProjectsByAuthorIdOrSupervisorId/${id}`
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error so the calling code can handle it
  }
};
export const deleteProject = async (id) => {
  try {
    const response = await getAxiosInstance().delete(`/delete/${id}`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error so the calling code can handle it
  }
};
