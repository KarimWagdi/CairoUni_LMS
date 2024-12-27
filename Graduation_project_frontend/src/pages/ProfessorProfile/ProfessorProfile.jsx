import Profile from "../../components/profile/Profile"; // Adjust the path accordingly
import MainDrawer from "../../components/Home/MainDrawer";
import * as professorApi from "../../api/professor"; // Adjust the path accordingly
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams

const ProfessorProfile = () => {
  const { id } = useParams(); // Use useParams hook to get the id parameter
  const [prof, setProf] = useState({});

  useEffect(() => {
    professorApi.getProfessorById(id)
      .then((res) => {
        setProf(res.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching professor data:", error);
      });
  }, [id]);
  return <MainDrawer component={<Profile professorData={prof} />} />;
};

export default ProfessorProfile;
