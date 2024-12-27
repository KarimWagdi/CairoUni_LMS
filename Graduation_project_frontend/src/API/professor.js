import axios from "axios";
import * as config from "./ApiConfig";

const baseURL = `${config.API_URL}/professor`;
const AttachementsBaseURL = `${config.API_URL}/professorAttachment`;

const getAxiosInstance = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
// const getAxiosInstanceAtt = () => {
//   const token = localStorage.getItem("token");

//   return axios.create({
//     baseURL: AttachementsBaseURL,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const getProfessors = async () => {
  try {
    const response = await getAxiosInstance().get("/allProfessors");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProfessor = async () => {
  try {
    const response = await getAxiosInstance().get("/getProfessor");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProfessor = async (id) => {
  try {
    const response = await getAxiosInstance().delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfessor = async ({
  id,
  updateData
}) => {
  try {
    const response = await getAxiosInstance().put(`/update/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProfessorAttach = async ({
  ssn,
  degreeDate,
  degreeUniversity,
  gender,
  degree,
  professorId,
}) => {
  try {
    console.log("professorId", professorId)
    const response = await getAxiosInstance().post(`${AttachementsBaseURL}/create`, {
      ssn,
      degreeDate,
      degreeUniversity,
      gender,
      degree,
      professorId,
    });
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
};

export const updateProfessorAttach = async ({
  id,
  ssn,
  degreeDate,
  degreeUniversity,
  gender,
  degree
}) => {
  try {
    const response = await getAxiosInstance().put(`${AttachementsBaseURL}/update/${id}`, {
      ssn,
      degreeDate,
      degreeUniversity,
      gender,
      degree,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProfessorById = async (id) => {
  try {
    const response = await getAxiosInstance().get(`/getProfessorById/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfessorImage = async (formData) => {
  try {
    const response = await axios.put(`${baseURL}/updateProfessorImage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
