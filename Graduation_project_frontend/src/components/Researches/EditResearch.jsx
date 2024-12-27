import styles from "./EditResearch.module.css";
import { useEffect, useState } from "react";
import * as research from "../../api/research";
import CrossIcon from "../../SVGs/CrossIcon";

const EditResearch = ({ itemId, handleCloseEdit }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    research.getResearch(itemId).then((res) => {
      setFormData(res.data[0]);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    research.updateResearch(
      formData.id,
      formData.title,
      formData.description,
      formData.startDate,
      formData.endDate,
      formData.status,
      formData.createdBy,
      formData.pagesNumper,
      formData.publisher,
      formData.magazinName,
      formData.magazinVolume,
      formData.publishYear,
      formData.majoring,
      formData.ProfessorRole,
      formData.type,
      formData.departmentId,
      formData.masterStudentId,
      formData.authorId,
      formData.supervisorId
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={handleSubmit()}>
      <div className={styles.title}>Edit Research </div>
        <label className={styles.label}>Title:</label>
        <input
          className={styles.input}
          value={formData.title || ""}
          onChange={handleChange}
          name="title"
        />
        <label className={styles.label}>Description:</label>
        <input
          className={styles.textarea}
          value={formData.description || ""}
          onChange={handleChange}
          name="description"
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
        <label className={styles.label}>Pages Number:</label>
        <input
          className={styles.input}
          type="number"
          value={formData.pagesNumber || ""}
          onChange={handleChange}
          name="pagesNumber"
        />
        <label className={styles.label}>Publisher:</label>
        <input
          className={styles.input}
          value={formData.publisher || ""}
          onChange={handleChange}
          name="publisher"
        />
        <label className={styles.label}>Magazine Name:</label>
        <input
          className={styles.input}
          value={formData.magazineName || ""}
          onChange={handleChange}
          name="magazineName"
        />
        <label className={styles.label}>Magazine Volume:</label>
        <input
          className={styles.input}
          value={formData.magazineVolume || ""}
          onChange={handleChange}
          name="magazineVolume"
        />
        <label className={styles.label}>Publish Year:</label>
        <input
          className={styles.input}
          type="number"
          value={formData.publishYear || ""}
          onChange={handleChange}
          name="publishYear"
        />
        <label className={styles.label}>Majoring:</label>
        <input
          className={styles.input}
          value={formData.majoring || ""}
          onChange={handleChange}
          name="majoring"
        />
        <div className={styles.flex}>
          <div>
            <label className={styles.label}>Professor Role:</label>
            <select
              className={styles.dropdown}
              value={formData.ProfessorRole || ""}
              onChange={handleChange}
              name="ProfessorRole"
            >
              <option value="ROLE_1">author</option>
              <option value="ROLE_2">supervisor</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>Type:</label>
            <select
              className={styles.dropdown}
              value={formData.type || ""}
              onChange={handleChange}
              name="type"
            >
              <option value="TYPE_1">Type 1</option>
              <option value="TYPE_2">Type 2</option>
            </select>
          </div>
        </div>
            {/*
        <div className={styles.flex}>
          <div>
            <label className={styles.label}>Department:</label>
            <select
              className={styles.dropdown}
              value={formData.departmentId || ""}
              onChange={handleChange}
              name="departmentId"
            >
            </select>
          </div>
          <div>
            <label className={styles.label}>Master Student:</label>
            <select
              className={styles.dropdown}
              value={formData.masterStudentId || ""}
              onChange={handleChange}
              name="masterStudentId"
            >
            </select>
          </div>
        </div>
              */}
        {/* <div className={styles.flex}>
          <div>
            <label className={styles.label}>Author:</label>
            <select
              className={styles.dropdown}
              value={formData.authorId || ""}
              onChange={handleChange}
              name="authorId"
            >
            </select>
          </div>
          <div>
            <label className={styles.label}>Supervisor:</label>
            <select
              className={styles.dropdown}
              value={formData.supervisorId || ""}
              onChange={handleChange}
              name="supervisorId"
            >
            </select>
          </div>
        </div> */}
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

export default EditResearch;
