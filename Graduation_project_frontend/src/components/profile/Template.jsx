import React,{useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./Template.module.css";
import temp1 from "../../assets/Templates/temp1.png";
import temp2 from "../../assets/Templates/temp2.png";
import CV1 from "./CV1"
import CV2 from "./CV2"

const drawerWidth = 264;

export default function Template() {
  const [TemplateNumber, setTemplateNumber] = useState(0);

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
        {
          TemplateNumber == 0 ?( <div   className={styles.container}>
          <div onClick={()=>setTemplateNumber(1)} className={styles.singleTemp}>
            <img src={temp1} />
          </div>
          <div onClick={()=>setTemplateNumber(2)} className={styles.singleTemp}>
            <img src={temp2} />
          </div>
        </div>) :TemplateNumber == 1 ?  (<CV1/>) :TemplateNumber == 2 ?(<CV2/>): (<div> </div>)

        }
      </Box>
    </>
  );
}
