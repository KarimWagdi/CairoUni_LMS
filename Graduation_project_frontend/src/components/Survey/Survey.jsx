import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./Survey.module.css";
import Line from "../../SVGs/Line";
import Modal from "@mui/material/Modal";
import * as UserSurveyAPI from "../../API/userSurvey";
import SurveyQuestions from "./SurveyQuestions";
import CreateSurvey from "./CreateSurvey";
import PlusIcon from "../../SVGs/PlusIcon";
import * as professor from "../../API/professor";

const drawerWidth = 264;

export default function Survey() {
  const [selectedValues, setSelectedValues] = useState(Array(10).fill(null));
  const [surveys, setSurveys] = useState([]);
  // const [doneSurveys, setDoneSurveys] = useState([]);
  const [surveyId, setSurveyId] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeSurveyIndex, setActiveSurveyIndex] = useState(null);
  const [prof, setProf] = useState({});
  useEffect(() => {
    professor.getProfessor().then((res) => {
      setProf(res.data[0]);
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRadioChange = (questionIndex, value) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[questionIndex] = value;
    setSelectedValues(newSelectedValues);
  };
  const handleSurveyClick = (idx) => {
    setSurveyId(surveys[idx].survey.id);
    setActiveSurveyIndex(idx);
  };
  useEffect(() => {
    UserSurveyAPI.getProfessorSurveys().then((res) => {
      setSurveys(res.data.filter((survey) => !survey.complete));
      // setDoneSurveys(res.data.filter((survey) => survey.complete));
    });
  }, []);
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
        <div className={styles.title}>Surveys</div>
        {prof.role == "admin" ? (
          <div className={styles.buttton_container}>
            <div onClick={handleOpen} className={styles.add_button}>
              <PlusIcon />
              <div>Create Survey</div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.container}>
          <div className={styles.surveys_container}>
            {surveys.map((survey, index) => (
              <div
                key={survey.id}
                className={styles.survey_btn_and_dott}
                onClick={() => handleSurveyClick(index)}
              >
                <div
                  className={`${
                    activeSurveyIndex === index
                      ? styles.survey_btn_active
                      : styles.survey_btn_unread
                  }`}
                >
                  {survey.survey.name}
                </div>
                {index !== activeSurveyIndex && (
                  <div className={styles.dott}></div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.survey_container}>
            {surveyId ? (
              <SurveyQuestions surveyId={surveyId} />
            ) : (
              <h1>No Survey Selected</h1>
            )}
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateSurvey handleClose={handleClose} />
        </Modal>
      </Box>
    </>
  );
}
