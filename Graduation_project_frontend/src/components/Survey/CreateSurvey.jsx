import { useState } from "react";
import styles from "./CreateSurvey.module.css";
import CrossIcon from "../../SVGs/CrossIcon";
import * as question from "../../API/question";
import * as answer from "../../API/answer"
import * as survey from "../../API/survey"
import * as userSurvey from "../../API/userSurvey"
import {getProfessors} from "../../API/professor"

const CreateSurvey = ({handleClose}) => {
  const [surveyName, setSurveyName] = useState("");
  const [numQuestions, setNumQuestions] = useState();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = updatedAnswers[questionIndex] || [];
    updatedAnswers[questionIndex][answerIndex] = value;
    setAnswers(updatedAnswers);
  };

  const createSurvey = async () => {
    const surveyResponse = await survey.createSurvey(surveyName);
    const surveyId = surveyResponse.data[0].id;
    const questionPromises = questions.map((questionText) =>
      question.createQuestion({surveyId, text:questionText})
    );
    const questionResponses = await Promise.all(questionPromises);
    const questionIds = questionResponses.map((response) => response.data[0].id);
    const answerPromises = questionIds.map((questionId, index) => {
      const answerTexts = answers[index];
      answerTexts.map((answerText) => {
        answer.createAnswer({questionId, text:answerText})
      })
    });
    const answerResponses = await Promise.all(answerPromises);
    const professors = await getProfessors();
    const userSurveyPromises = professors?.data.map((professor) => {
      userSurvey.createSurvey({surveyId, professorId: professor.id})
    })
    const userSurveyResponses = await Promise.all(userSurveyPromises);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1 className={styles.title}>Create Survey</h1>
        <label className={styles.label} htmlFor="surveyName">
          Survey Name:
        </label>
        <input
          className={styles.input}
          type="text"
          id="surveyName"
          value={surveyName}
          onChange={(e) => setSurveyName(e.target.value)}
          placeholder="Enter survey name"
        />

        <label className={styles.label} htmlFor="numQuestions">
          Number of Questions:
        </label>
        <input
          className={styles.input}
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
          placeholder="Enter number of questions"
        />

        {Array.from({ length: numQuestions }, (_, questionIndex) => (
          <div key={questionIndex}>
            <label
              className={styles.label}
              htmlFor={`question${questionIndex + 1}`}
            >{`Question ${questionIndex + 1}:`}</label>
            <input
              className={styles.input}
              type="text"
              id={`question${questionIndex + 1}`}
              value={questions[questionIndex] || ""}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
              placeholder={`Enter question ${questionIndex + 1}`}
            />

            <label
              className={styles.label}
              htmlFor={`numAnswers${questionIndex + 1}`}
            >{`Number of Answers:`}</label>
            <input
              className={styles.input}
              type="number"
              id={`numAnswers${questionIndex + 1}`}
              placeholder={`Enter number of answers for question ${
                questionIndex + 1
              }`}
              onChange={(e) => {
                const numAnswers = parseInt(e.target.value, 10);
                const updatedAnswers = [...answers];
                updatedAnswers[questionIndex] = Array.from(
                  { length: numAnswers },
                  () => ""
                );
                setAnswers(updatedAnswers);
              }}
            />

            {answers[questionIndex]?.map((answer, answerIndex) => (
              <div key={`${questionIndex}-${answerIndex}`}>
                <label
                  className={styles.label}
                  htmlFor={`answer${questionIndex + 1}-${answerIndex + 1}`}
                >{`Answer ${answerIndex + 1}:`}</label>
                <input
                  className={styles.input}
                  type="text"
                  id={`answer${questionIndex + 1}-${answerIndex + 1}`}
                  value={answer || ""}
                  onChange={(e) =>
                    handleAnswerChange(
                      questionIndex,
                      answerIndex,
                      e.target.value
                    )
                  }
                  placeholder={`Enter answer ${answerIndex + 1} for question ${
                    questionIndex + 1
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
        <div className={styles.btns_container}>
          <div className={styles.cancel_btn} onClick={handleClose}>
            <CrossIcon />
            Cancel
          </div>
          <button className={styles.save_btn} onClick={createSurvey}>
            Create Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;
