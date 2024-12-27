import EditIcon from "../../SVGs/EditIcon";
import PlusIcon from "../../SVGs/PlusIcon";
import EnhancedTable from "./EnhancedTable";
import Modal from "@mui/material/Modal";
import EditProfile from "./EditProfile";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./HomeStyle.module.css";
import avatar from "../../assets/Home/profile.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as professor from "../../api/professor";
import * as research from "../../api/research";
import * as project from "../../api/projects";

const drawerWidth = 264;

export default function Homecontent() {
  const [ProfessorResearches, setProfessorResearches] = useState([]);
  const [ProfessorProjects, setProfessorProjects] = useState([]);
  const [projectOrResearch, setprojectOrResearch] = useState("research");
  const [type, setType] = useState("Research");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [prof, setProf] = useState({});

  const navegate = useNavigate();

  useEffect(() => {
    professor.getProfessor().then((res) => {
      setProf(res.data[0]);
    });
  }, []);

  const navegatgeToAdd = () => navegate(`/home/${projectOrResearch}s/add`);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleDelete = async (id) => {
    if (type === "Project") await project.deleteProject(id);
    else await research.deleteResearch(id);
    location.reload();
  };
  const onUpdate = async ({id, fullName, specialty, phoneNumber, departmentId}) => {
    try {
      id = parseInt(id);
      departmentId = parseInt(departmentId);
      await professor.updateProfessor({
        id,
        updateData:{
        fullName,
        specialty,
        phoneNumber,
        departmentId,}
    })
    } catch (error) {
      console.error("Error updating professor:", error);
    }
  };
  const handleUpdateProfAttach = async ({
    id,
    ssn,
    degreeDate,
    degreeUniversity,
    gender,
    degree
  }) => {
    try {
      await professor.updateProfessorAttach({
        id,
        ssn,
        degreeDate,
        degreeUniversity,
        gender,
        degree
    });
      console.log("Update successful");
    } catch (error) {
      console.error("Error updating professor:", error);
    }
  };

  useEffect(() => {
    (async () => {
      research
        .getProfessorResearches(prof.id)
        .then((res) => {
          setProfessorResearches(res.data);
        })
        .catch((error) => {
          console.error("Error fetching professor researches:", error);
        });
    })();
  }, [prof.id]);

  useEffect(() => {
    project
      .getProfessorProjects(prof.id)
      .then((res) => {
        setProfessorProjects(res.data);
      })
      .catch((error) => {
        console.error("Error fetching professor projects:", error);
      });
  }, [prof.id]);

  const handelProjectClick = () => {
    setprojectOrResearch("project");
    setType("Project");
  };
  const handelResearchClick = () => {
    setprojectOrResearch("research");
    setType("Research");
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div className={styles.prof_info}>
          <div className={styles.image_container}>
          <img src={prof?.image ? prof.image : avatar} />{" "}
          </div>
          <div>
            <div className={styles.name_and_edit}>
              <div className={styles.prof_name}>Prof. {prof.fullName}</div>
              <div onClick={handleOpenEdit} className={styles.edit}>
                <EditIcon />
              </div>
            </div>
            <div className={styles.prof_work}>
              Researcher and lecturer in {prof.specialty}
            </div>
            <div className={styles.prof_specialty}>
              {prof.specialty} {prof.department && prof.department.name}
            </div>
          </div>
        </div>
        <div className={styles.add_and_change_container}>
          <div className={styles.project_or_research}>
            <div
              onClick={handelProjectClick}
              className={
                projectOrResearch === "project"
                  ? styles.active_button
                  : styles.change_button
              }
            >
              Projects
            </div>
            <div
              onClick={handelResearchClick}
              className={
                projectOrResearch === "research"
                  ? styles.active_button
                  : styles.change_button
              }
            >
              Researches
            </div>
          </div>
          <div onClick={navegatgeToAdd} className={styles.add_button}>
            <PlusIcon />
            <div>Add {type}</div>
          </div>
        </div>

        <EnhancedTable
          handleDelete={handleDelete}
          key={type}
          type={type}
          ProfessorProjects={ProfessorProjects}
          ProfessorResearches={ProfessorResearches}
        />
      </Box>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProfile
          handleUpdateProfAttach={handleUpdateProfAttach}
          onUpdate={onUpdate}
          professorData={prof}
          handleCloseEdit={handleCloseEdit}
        />
      </Modal>
    </>
  );
}
