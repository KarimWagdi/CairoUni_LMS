import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./research.module.css";
import PlusIcon from "../../SVGs/PlusIcon";
import EnhancedTable from "../Home/EnhancedTable";
import { useEffect, useState } from "react";
import * as research from "../../API/research";
import * as professor from "../../API/professor";
import { useNavigate } from "react-router-dom";

const drawerWidth = 264;

const Researches = () => {
  const [ProfessorResearches, setProfessorResearches] = useState([]);
  const [prof, setProf] = useState({});
  const navegate = useNavigate();


  const navegatgeToAdd =()=>navegate(`/home/researchs/add`)

  useEffect(() => {
    professor.getProfessor().then((res) => {
      setProf(res.data[0]);
    });
  }, []);

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
        <div className={styles.title}>Researches</div>
        <div className={styles.buttton_container}>
          <div onClick={navegatgeToAdd} className={styles.add_button}>
            <PlusIcon />
            <div>Add Research</div>
          </div>
        </div>
        <EnhancedTable
          type={"Research"}
          ProfessorResearches={ProfessorResearches}
        />
      </Box>
    </>
  );
};

export default Researches;
