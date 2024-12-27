import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./projects.module.css";
import PlusIcon from "../../SVGs/PlusIcon";
import EnhancedTable from "../Home/EnhancedTable";
import { useEffect, useState } from "react";
import * as project from "../../api/projects";
import * as professor from "../../api/professor";
import { useNavigate } from "react-router-dom";

const drawerWidth = 264;

export default function Projects() {
  const [ProfessorProjects, setProfessorProjects] = useState([]);
  const [prof, setProf] = useState({});
  const navegate = useNavigate();

  const navegatgeToAdd = () => navegate(`/home/projects/add`);
  const handleDelete = (id) => {
    project.deleteProject(id).then(() => {
      location.reload();
    })
  };

  useEffect(() => {
    professor.getProfessor().then((res) => {
      setProf(res.data[0]);
    });
  }, []);

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
        <div className={styles.title}>Projects</div>
        <div className={styles.buttton_container}>
          <div onClick={navegatgeToAdd} className={styles.add_button}>
            <PlusIcon />
            <div>Add Project</div>
          </div>
        </div>
        <EnhancedTable type={"Project"} ProfessorProjects={ProfessorProjects} handleDelete={handleDelete} />
      </Box>
    </>
  );
}
