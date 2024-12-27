import { useState, useEffect } from "react";
import styles from "./Survey.module.css";
import Line from "../../SVGs/Line";
import * as surveyAPI from "../../API/survey";
import * as UserSurveyAPI from "../../API/userSurvey";
import * as responseAPI from "../../API/response";

export default function Survey({ surveyId }) {
  const [selectedValues, setSelectedValues] = useState(Array(10).fill(null));
  const [survey, setSurvey] = useState([]);

  const handleRadioChange = (questionIndex, value) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[questionIndex] = value;
    setSelectedValues(newSelectedValues);
  };

  const handleSubmit = () => {
    for (let index = 0; index < survey?.questions?.length; index++) {
      if (selectedValues[index] === null) {
        alert("Please answer all questions!");
        return;
      }
    }
    for (let index = 0; index < survey?.questions?.length; index++) {
      const question = survey.questions[index];
      const answer = question.answers[selectedValues[index]];
      responseAPI.createResponse(answer.id);
    }
    UserSurveyAPI.getSurveyBySurveyId(surveyId).then((res) =>
      UserSurveyAPI.updateComplete(res.data[0].id, true).then((res) =>
        window.location.reload()
      )
    );
  };

  useEffect(() => {
    surveyAPI.getSurvey(surveyId).then((res) => {
      setSurvey(res.data[0]);
      setSelectedValues(Array(res.data[0].questions.length).fill(null));
    });
    console.log;
  }, [surveyId]);
  return (
    <>
      <div className={styles.survey_title}>{survey[0]?.name}</div>
      {survey &&
        survey.questions?.map((question, index) => (
          <div key={index} className={styles.question}>
            {question.text}
            <div>
              {question.answers?.map((answer, idx) => (
                <div key={idx} className={styles.answer_container}>
                  <input
                    type="radio"
                    id={`option${index}_${idx}`}
                    value={answer}
                    checked={selectedValues[index] === idx}
                    onChange={() => handleRadioChange(index, idx)}
                  />
                  <label
                    htmlFor={`option${index}_${idx}`}
                    className={styles.answer}
                  >
                    {answer.text}
                  </label>
                </div>
              ))}
            </div>
            <div className={styles.line_container}>
              <Line />
            </div>
          </div>
        ))}
      <div className={styles.btn_container}>
        <div className={styles.Submit_btn} onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </>
  );
}
