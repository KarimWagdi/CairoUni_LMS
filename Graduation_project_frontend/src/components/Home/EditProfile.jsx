import styles from "./EditProfile.module.css";
import { useState } from "react";
import CrossIcon from "../../SVGs/CrossIcon";
import * as professor from "../../API/professor";

const EditProfile = ({ professorData, onUpdate, handleUpdateProfAttach, handleCloseEdit }) => {
  const [formData, setFormData] = useState({ ...professorData });

  const createProfAttach = async ({
    ssn,
    degreeDate,
    degreeUniversity,
    gender,
    degree,
    professorId,
  }) => {
    try {
      ssn = parseInt(ssn);
      degreeDate = parseInt(degreeDate);
      await professor.createProfessorAttach({
        ssn,
        degreeDate,
        degreeUniversity,
        gender,
        degree,
        professorId,
      });
      console.log("Create successful");
    } catch (error) {
      console.error("Error creating professor:", error);
    }
  };

  const handleChange = (e) => {
    console.log(formData)
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      ...(name.includes(".")
        ? {
          professorAttachment: {
            ...prevData.professorAttachment,
            [name.split(".")[1]]: value,
          },
        }
        : { [name]: value }),
    }));
  };

  const handleSubmit = (e) => {
    onUpdate(
      formData
    );
    const { professorAttachment, id } = formData
    if (formData.professorAttachment.id){
      handleUpdateProfAttach(
       professorAttachment
      );
    }
    else {
      const { ssn, degreeDate, degreeUniversity, gender, degree } = professorAttachment
      const professorId = id
      createProfAttach({
        ssn,
        degreeDate,
        degreeUniversity,
        gender,
        degree,
        professorId,
      })
    }
  };
  // handleUpdateProfAttach(1,5,2012,"c","Male","Assistant")
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Full Name
          <input
            className={styles.input}
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={styles.label}>
          Specialty
          <input
            className={styles.input}
            type="text"
            name="specialty"
            value={formData.specialty || ""}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={styles.label}>
          Phone Number
          <input
            className={styles.input}
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={styles.label}>
          Department
          <input
            className={styles.input}
            type="number"
            name="departmentId"
            value={formData.departmentId || 0}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={styles.label}>
          SSN
          <input
            className={styles.input}
            type="number"
            name="professorAttachment.ssn"
            value={formData.professorAttachment?.ssn || 0}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={styles.label}>
          Degree Date
          <input
            className={styles.input}
            type="number"
            name="professorAttachment.degreeDate"
            value={formData.professorAttachment?.degreeDate || 0}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={styles.label}>
          Degree University
          <input
            className={styles.input}
            type="text"
            name="professorAttachment.degreeUniversity"
            value={formData.professorAttachment?.degreeUniversity || ""}
            onChange={handleChange}
          />
        </label>
        <br />

        <label className={styles.label}>
          Gender
          <input
            className={styles.input}
            type="text"
            name="professorAttachment.gender"
            value={formData.professorAttachment?.gender || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className={styles.label}>
          Degree
          <input
            className={styles.input}
            type="text"
            name="professorAttachment.degree"
            value={formData.professorAttachment?.degree || ""}
            onChange={handleChange}
          />
        </label>
        <br />
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

export default EditProfile;
