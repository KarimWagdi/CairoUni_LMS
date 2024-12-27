import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./Professors.module.css";
import SearchBar from "../base-components/SearchBar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import FiltersIcon from "../../SVGs/FiltersIcon";
import * as React from "react";
import avatar from "../../assets/Home/profile.svg";
import { useEffect, useState } from "react";
import * as professor from "../../api/professor";
import * as search from "../../api/search";
import { Link } from "react-router-dom";



const drawerWidth = 264;

export default function Professors() {
  const [professors, setProfessors] = useState([]);
  useEffect(() => {
    professor
      .getProfessors()
      .then((res) => {
        setProfessors(res.data);
      })
      .catch((error) => {
        console.error("Error fetching professors:", error);
      });
  }, []);

 
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (searchQuery === "") {
      professor
        .getProfessors()
        .then((res) => {
          setProfessors(res.data);
        })
        .catch((error) => {
          console.error("Error fetching professors:", error);
        });
      return;
    }
    search
      .search(searchQuery)
      .then((res) => {
        setProfessors(res.data);
      })
      .catch((error) => {
        console.error("Error searching professors:", error);
      });
  }, [searchQuery]);
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
        <div className={styles.title}>Professors</div>
        <div className={styles.search_container}>
          {/* <div className={styles.Filters_btn}>
            <FiltersIcon />
            Filters
          </div> */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <List sx={{ mb: 2 }}>

          {professors.map((professor) => (
            <React.Fragment key={professor.id}>
              <ListItem button component={Link} to={`/home/professors/${professor.id}`}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={professor.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={professor.fullName}
                  secondary={`${professor.department?.name} ${
                    professor.specialty == null ? "" : professor.specialty
                  }`}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
}
