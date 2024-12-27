// EditProject.js
import styles from "../Researches/EditResearch.module.css";
import { useEffect, useState } from "react";
import * as project from "../../api/projects";
import CrossIcon from "../../SVGs/CrossIcon";

const EditProject = ({ projectId, handleCloseEdit }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    project.getProjectById(projectId).then((res) => {
      setFormData(res.data[0]);
    });
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { projectId, projectName, description, topic, startDate, endDate, status, createdBy, affiliate, type, ProfessorRole, departmentId, professorId } = formData;
    console.log(formData)
    // project.updateProject({
    //   id:projectId,
    //   projectName,
    //   description,
    //   topic,
    //   startDate,
    //   endDate,
    //   status,
    //   createdBy,
    //   affiliate,
    //   type,
    //   ProfessorRole,
    //   departmentId,
    //   professorId
    // }).then((res) => {
    //   console.log(res);
    // });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <div className={styles.title}>Edit Project</div>
        <label className={styles.label}>Project Name:</label>
        <input
          className={styles.input}
          value={formData.projectName || ""}
          onChange={handleChange}
          name="projectName"
        />
        <label className={styles.label}>Description:</label>
        <input
          className={styles.textarea}
          value={formData.description || ""}
          onChange={handleChange}
          name="description"
        />
        <label className={styles.label}>Topic:</label>
        <input
          className={styles.input}
          value={formData.topic || ""}
          onChange={handleChange}
          name="topic"
        />
        <div className={styles.flex}>
          <div>
            <label className={styles.label}>Start Date:</label>
            <input
              className={styles.dropdown}
              type="date"
              value={formData.startDate || ""}
              onChange={handleChange}
              name="startDate"
            />
          </div>
          <div>
            <label className={styles.label}>End Date:</label>
            <input
              className={styles.dropdown}
              type="date"
              value={formData.endDate || ""}
              onChange={handleChange}
              name="endDate"
            />
          </div>
        </div>
        <label className={styles.label}>Status:</label>
        <input
          className={styles.input}
          value={formData.status || ""}
          onChange={handleChange}
          name="status"
        />
        <label className={styles.label}>Created By:</label>
        <input
          className={styles.input}
          value={formData.createdBy || ""}
          onChange={handleChange}
          name="createdBy"
        />
        <label className={styles.label}>Affiliate:</label>
        <input
          className={styles.input}
          value={formData.affiliate || ""}
          onChange={handleChange}
          name="affiliate"
        />
        <div className={styles.flex}>
          <div>
            <label className={styles.label}>Type:</label>
            <select
              className={styles.dropdown}
              value={formData.type || ""}
              onChange={handleChange}
              name="type"
            >
              {/* Populate the options based on your data or API */}
            </select>
          </div>
          <div>
            <label className={styles.label}>Professor Role:</label>
            <select
              className={styles.dropdown}
              value={formData.ProfessorRole || ""}
              onChange={handleChange}
              name="ProfessorRole"
            >
              <option value="ROLE_1">Type 1</option>
              <option value="ROLE_2">Type 2</option>
            </select>
          </div>
        </div>
        <div className={styles.flex}>
          <div>
            <label className={styles.label}>Department:</label>
            <select
              className={styles.dropdown}
              value={formData.departmentId || ""}
              onChange={handleChange}
              name="departmentId"
            >
              {/* Populate the options based on your data or API */}
            </select>
          </div>
          <div>
            <label className={styles.label}>Professor:</label>
            <select
              className={styles.dropdown}
              value={formData.professorId || ""}
              onChange={handleChange}
              name="professorId"
            >
              {/* Populate the options based on your data or API */}
            </select>
          </div>
        </div>
        <div className={styles.btns_container}>
          <div className={styles.cancel_btn} onClick={handleCloseEdit}>
            <CrossIcon />
            Cancel
          </div>
          <button className={styles.save_btn} type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
