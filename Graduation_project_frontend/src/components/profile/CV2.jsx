import React, { useRef, useState, useEffect } from "react";
import styles from "./CV2.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as professor from "../../api/professor";
import * as research from "../../api/research";
import * as project from "../../api/projects";
import * as professor_positions from "../../api/ProfessorPositions";
import * as professor_awards from "../../api/ProfessorAwards";

const CV2 = () => {
  const downloadPDF = (pdfRef) => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save("invoice.pdf");
    });
  };

  const [ProfessorResearches, setProfessorResearches] = useState([]);
  const [ProfessorProjects, setProfessorProjects] = useState([]);
  const [professorPositions, setProfessorPositions] = useState([]);
  const [professorAwards, setProfessorAwards] = useState([]);
  const [prof, setProf] = useState({});
  const professorData = undefined;

  const pdfRef = useRef();
  useEffect(() => {
    if (professorData === undefined || professorData === null) {
      professor
        .getProfessor()
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setProf(res.data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching professor data:", error);
        });
    } else {
      setProf(professorData);
    }
  }, [professorData]);

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
  }, [prof?.id]);
  useEffect(() => {
    (async () => {
      professor_positions
        .getByProfessorId(prof.id)
        .then((res) => {
          setProfessorPositions(res.data);
        })
        .catch((error) => {
          console.error("Error fetching professor researches:", error);
        });
    })();
  }, [prof?.id]);

  useEffect(() => {
    (async () => {
      professor_awards
        .getByProfessorId(prof.id)
        .then((res) => {
          setProfessorAwards(res.data);
          console.log(res.data)
        })
        .catch((error) => {
          console.error("Error fetching professor researches:", error);
        });
    })();
  }, [prof?.id]);

  useEffect(() => {
    project
      .getProfessorProjects(prof.id)
      .then((res) => {
        setProfessorProjects(res.data);
      })
      .catch((error) => {
        console.error("Error fetching professor projects:", error);
      });
  }, [prof?.id]);

  return (
    <>
      <div className={styles.download_bt} onClick={() => downloadPDF(pdfRef)}>
        Download PDF
      </div>
      <div ref={pdfRef} className={styles.container}>
        <header className={styles.header}>
          <h1>{prof.fullName}</h1>
          <p>{prof.specialty}</p>
          <div className={styles.contact}>
            <p> {prof.email}</p>
            <p> {prof.phoneNumber}</p>
            <p> Giza, Egypt</p>
          </div>
        </header>
        <section className={styles.education}>
          <h3>Positions</h3>
          <section className={styles.education}>
            {professorPositions.map((positionItem) => (
              <div key={positionItem.id} className={styles.sectionContent}>
                <h4>{positionItem.name}</h4>
                <p>Organization name's</p>
                <p>
                  {positionItem.startDate}|{positionItem.endDate}
                </p>
              </div>
            ))}
          </section>
        </section>
        <section className={styles.experience}>
          <h3>Researches</h3>
          {ProfessorResearches.map((researchItem) => (
            <div key={researchItem.id} className={styles.sectionContent}>
              <h4>{researchItem.title}</h4>
              <p>{researchItem.description}</p>
              <p>
                {researchItem.publishYear} | {researchItem.majoring}
              </p>
            </div>
          ))}
        </section>
        <section className={styles.projects}>
          <h3>Projects</h3>
          {ProfessorProjects.map((projectItem) => (
            <div key={projectItem.id} className={styles.sectionContent}>
              <h4>{projectItem.projectName}</h4>
              <p>Role : {projectItem.ProfessorRole}</p>
              <p>{projectItem.description}</p>
              <p>
                {projectItem.type} Project | {projectItem.topic} |{" "}
                {projectItem.affiliate}
              </p>
            </div>
          ))}
        </section>
        <section className={styles.projects}>
          <h3>Awards</h3>
          {professorAwards.map((awardItem) => (
            <div key={awardItem.id} className={styles.sectionContent}>
              <h4>{awardItem.name}</h4>
              <p>Field : {awardItem.field}</p>
              <p>At : {awardItem.date}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default CV2;
