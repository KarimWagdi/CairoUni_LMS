import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./Analysis.module.css";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const drawerWidth = 264;

const Analysis = () => {
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2023);
  const [selectedSurveyId, setSelectedSurveyId] = useState(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState(1);

  const handleSurveyChange = (e) => {
    const surveyId = parseInt(e.target.value);
    setSelectedSurveyId(surveyId);
    const firstQuestionId = staticSurveys.find(
      (survey) => survey.surveyId === surveyId
    ).questions[0].questionId;
    setSelectedQuestionId(firstQuestionId);
  };

  const handleQuestionChange = (e) => {
    setSelectedQuestionId(parseInt(e.target.value));
  };

  const staticResearchers = [
    { publishYear: 2001, count: 5 },
    { publishYear: 2002, count: 10 },
    { publishYear: 2003, count: 3 },
    { publishYear: 2004, count: 7 },
    { publishYear: 2005, count: 8 },
    { publishYear: 2006, count: 2 },
    { publishYear: 2007, count: 4 },
  ];

  const staticProjects = [
    { startDate: "2001", count: 2 },
    { startDate: "2002", count: 5 },
    { startDate: "2003", count: 7 },
    { startDate: "2004", count: 3 },
    { startDate: "2005", count: 6 },
    { startDate: "2006", count: 4 },
    { startDate: "2007", count: 9 },
  ];

  const staticAwards = [
    { date: "2001", count: 1 },
    { date: "2002", count: 3 },
    { date: "2003", count: 5 },
    { date: "2004", count: 2 },
    { date: "2005", count: 4 },
    { date: "2006", count: 6 },
    { date: "2007", count: 3 },
  ];

  const staticSurveys = [
    {
      surveyId: 1,
      surveyName: "Research Preferences",
      questions: [
        {
          questionId: 1,
          questionText: "What is your favorite research area?",
          answers: [
            { text: "Machine Learning", count: 10 },
            { text: "Data Science", count: 7 },
            { text: "Cybersecurity", count: 5 },
            { text: "AI", count: 8 },
            { text: "Web", count: 12 },

          ],
        },
        {
          questionId: 2,
          questionText: "What is your preferred programming language?",
          answers: [
            { text: "Python", count: 15 },
            { text: "JavaScript", count: 8 },
            { text: "C++", count: 3 },
            {text: "Java", count: 20 },
            { text: "Go", count: 2 },
            { text: "Rust", count: 1 },
          ],
        },
      ],
    },
    {
      surveyId: 2,
      surveyName: "Teaching Preferences",
      questions: [
        {
          questionId: 3,
          questionText: "What is your preferred teaching method?",
          answers: [
            { text: "Lecture", count: 12 },
            { text: "Hands-on", count: 9 },
            { text: "Discussion", count: 6 },
          ],
        },
        {
          questionId: 4,
          questionText: "What is your preferred class size?",
          answers: [
            { text: "Small (<20)", count: 14 },
            { text: "Medium (20-40)", count: 11 },
            { text: "Large (>40)", count: 4 },
          ],
        },
      ],
    },
    // Add more survey data as needed
  ];

  const filteredResearchers = staticResearchers.filter(
    (data) => data.publishYear >= startYear && data.publishYear <= endYear
  );

  const filteredProjects = staticProjects.filter(
    (data) =>
      parseInt(data.startDate) >= startYear &&
      parseInt(data.startDate) <= endYear
  );

  const filteredAwards = staticAwards.filter(
    (data) => parseInt(data.date) >= startYear && parseInt(data.date) <= endYear
  );

  const selectedSurvey = staticSurveys.find(
    (survey) => survey.surveyId === selectedSurveyId
  );
  const selectedQuestion = selectedSurvey.questions.find(
    (question) => question.questionId === selectedQuestionId
  );

  const researchersData = {
    labels: filteredResearchers.map((r) => r.publishYear),
    datasets: [
      {
        label: "Researchers",
        data: filteredResearchers.map((r) => r.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const projectsData = {
    labels: filteredProjects.map((p) => p.startDate),
    datasets: [
      {
        label: "Graduation Projects",
        data: filteredProjects.map((p) => p.count),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const awardsData = {
    labels: filteredAwards.map((a) => a.date),
    datasets: [
      {
        label: "Awards",
        data: filteredAwards.map((a) => a.count),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const surveyData = {
    labels: selectedQuestion.answers.map((a) => a.text),
    datasets: [
      {
        label: "Number of Professors",
        data: selectedQuestion.answers.map((a) => a.count),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
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
        <div className={styles.analysisPage}>
          <h1 className={styles.title}>Analysis Page</h1>
          <div className={styles.filter}>
            <label>Start Year: </label>
            <input
              type="number"
              name="startYear"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
            <label>End Year: </label>
            <input
              type="number"
              name="endYear"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          <div className={styles.chartContainer}>
            <h2>Researchers</h2>
            <Bar data={researchersData} />
          </div>
          <div className={styles.chartContainer}>
            <h2>Graduation Projects</h2>
            <Bar data={projectsData} />
          </div>
          <div className={styles.chartContainer}>
            <h2>Awards</h2>
            <Bar data={awardsData} />
          </div>
          <div className={styles.chartContainer}>
            <h2>Survey Results</h2>
            <div className={styles.selectSurvey}>
              <div >
                <label>Select Survey: </label>
                <select onChange={handleSurveyChange} value={selectedSurveyId}>
                  {staticSurveys.map((survey) => (
                    <option key={survey.surveyId} value={survey.surveyId}>
                      {survey.surveyName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Select Question: </label>
                <select
                  onChange={handleQuestionChange}
                  value={selectedQuestionId}
                >
                  {selectedSurvey.questions.map((question) => (
                    <option
                      key={question.questionId}
                      value={question.questionId}
                    >
                      {question.questionText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Bar data={surveyData} />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Analysis;
