import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "../../SVGs/LogoutIcon";
import HomeIcon from "../../SVGs/HomeIcon";
import ProjectsIcon from "../../SVGs/ProjectsIcon";
import ResearchesIcon from "../../SVGs/ResearchesIcon";
import SurveysIcon from "../../SVGs/SurveysIcon";
import ProfileIcon from "../../SVGs/ProfileIcon";
import AnalysisIcon from "../../SVGs/AnalysisIcon";
import Group from "../../SVGs/Group";
import logo from "../../assets/logo.png";
import styles from "./HomeStyle.module.css";
import * as professor from "../../api/professor";

const Drawer = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [prof, setProf] = useState({});

  useEffect(() => {
    professor.getProfessor().then((res) => {
      setProf(res.data[0]);
    });
  }, []);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const btns = ["home", "projects", "researchs", "surveys", "profile"];
  const adminBtns = [
    "home",
    "projects",
    "researchs",
    "surveys",
    "profile",
    "professors",
    "analysis",
  ];

  return (
    <div className={styles.drawer_container}>
      <div className={styles.logo_container}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <List>
        {prof.role == "admin"
          ? adminBtns.map((path) => (
              <ListItem key={path} disablePadding>
                <div
                  className={
                    activeItem.split("/")[2] === `${path}`
                      ? styles.active_derawer_button
                      : styles.nonactive_derawer_button
                  }
                >
                  <ListItemButton
                    component={Link}
                    to={path === "home" ? "/home" : `/home/${path}`}
                    onClick={() => handleItemClick(`/home/${path}`)}
                  >
                    <ListItemIcon
                      style={{
                        color: path === activeItem ? "white" : "#667085",
                      }}
                    >
                      {path === "home" ? (
                        <HomeIcon
                          color={
                            activeItem === `/home/${path}` ? "white" : "#667085"
                          }
                        />
                      ) : path === "projects" ? (
                        <ProjectsIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : path === "researchs" ? (
                        <ResearchesIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : path === "surveys" ? (
                        <SurveysIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : path === "professors" ? (
                        <Group
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : path === "analysis" ? (
                        <AnalysisIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : (
                        <ProfileIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        path === "home"
                          ? "Home"
                          : path === "projects"
                          ? "Projects"
                          : path === "researchs"
                          ? "Researches"
                          : path === "surveys"
                          ? "Survey"
                          : path === "professors"
                          ? "Professors"
                          : path === "analysis"
                          ? "Analysis"
                          : "Profile"
                      }
                      className={
                        `${path}` === activeItem.split("/")[2]
                          ? styles.active_derawer_item
                          : styles.derawer_item
                      }
                    />
                  </ListItemButton>
                </div>
              </ListItem>
            ))
          : btns.map((path) => (
              <ListItem key={path} disablePadding>
                <div
                  className={
                    activeItem.split("/")[2] === `${path}`
                      ? styles.active_derawer_button
                      : styles.nonactive_derawer_button
                  }
                >
                  <ListItemButton
                    component={Link}
                    to={path === "home" ? "/home" : `/home/${path}`}
                    onClick={() => handleItemClick(`/home/${path}`)}
                  >
                    <ListItemIcon
                      style={{
                        color: path === activeItem ? "white" : "#667085",
                      }}
                    >
                      {path === "home" ? (
                        <HomeIcon
                          color={
                            activeItem === `/home/${path}` ? "white" : "#667085"
                          }
                        />
                      ) : path === "projects" ? (
                        <ProjectsIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : path === "researchs" ? (
                        <ResearchesIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : path === "surveys" ? (
                        <SurveysIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      ) : (
                        <ProfileIcon
                          color={
                            activeItem.split("/")[2] === `${path}`
                              ? "white"
                              : "#667085"
                          }
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        path === "home"
                          ? "Home"
                          : path === "projects"
                          ? "Projects"
                          : path === "researchs"
                          ? "Researches"
                          : path === "surveys"
                          ? "Survey"
                          : "Profile"
                      }
                      className={
                        `${path}` === activeItem.split("/")[2]
                          ? styles.active_derawer_item
                          : styles.derawer_item
                      }
                    />
                  </ListItemButton>
                </div>
              </ListItem>
            ))}
      </List>
      <div className={styles.log_out} onClick={handleLogOut}>
        <LogoutIcon /> Log out
      </div>
    </div>
  );
};

export default Drawer;
