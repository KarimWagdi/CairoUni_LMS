import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import styles from "./HomeStyle.module.css";
import MyDrawer from "./drawer";
import avatar from "../../assets/Home/profile.svg";
import Chatbot from '../base-components/Chatbot';

import { useEffect, useState } from "react";
import * as professor from "../../API/professor";

const drawerWidth = 264;

const MainDrawer = (props) => {
  const { window ,component } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [prof, setProf] = useState({});
  

  useEffect(() => {
    professor.getProfessor().then((res) => {
      setProf(res.data[0]);
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="who"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className={styles.avatar_and_name}>
            <div className={styles.avatar_contanir1}>
              <img src={prof.image?prof.image:avatar} alt="professor image" />
            </div>
            <div>
              <div className={styles.prof_name1}>prof. {prof.fullName}</div>
              <div className={styles.prof_specialty1}>{prof.specialty}</div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <MyDrawer />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <MyDrawer />
        </Drawer>
      </Box>
      {component}
      <Chatbot/>
    </Box>
  );
};
MainDrawer.propTypes = {
  window: PropTypes.func,
};

export default MainDrawer;
