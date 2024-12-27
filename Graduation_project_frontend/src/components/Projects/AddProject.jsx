import styles from "./AddProject.module.css";
import CrossIcon from "../../SVGs/CrossIcon";
import PlusIcon from "../../SVGs/PlusIcon";
import { useState, useEffect } from "react";
import { getDepartments } from "../../api/department";
import { createProject } from "../../api/projects";
import { useNavigate } from "react-router-dom";
import {getProfessor} from "../../API/professor";

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    createdBy: "",
    topic: "",
    status: "",
    startDate: "2023-01-01",
    endDate: "2023-01-01",
    ProfessorRole: "supervisor",
    type: "Master",
    departmentId: 1,
    ProfessorId:1,
    affiliate:""
  });
  const [departments, setDepartments] = useState([]);
  const [professor, setProfessor] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDepartments();
        setDepartments(res.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      departmentId: departments[e.target.selectedIndex].id,
    }));
  };

  const handleSubmit = async () => {
    try {
      for (const key in formData) {
        if (formData[key] === "") {
          alert("Please fill all fields");
          return;
        }
      }
      const {projectName, ProfessorId, ProfessorRole, createdBy, departmentId, description, endDate, startDate, status, topic, type, affiliate} = formData
      await createProject(projectName,
        description,
        createdBy,
        topic,
        status,
        startDate,
        endDate,
        ProfessorRole,
        type,
        departmentId,
        affiliate,
        ProfessorId).then(()=>navigate(-1));
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Add Project</div>
      <div className={styles.btns_container}>
        <div onClick={() => navigate(-1)} className={styles.cancel_btn}>
          <CrossIcon />
          Cancel
        </div>
        <div className={styles.add_btn} onClick={handleSubmit}>
          <PlusIcon /> Add Project
        </div>
      </div>
      <form className={styles.form_container}>
        <div className={styles.container_information}>
          <div className={styles.container_title}>General Information</div>
          <label className={styles.label}>Project Name</label>
          <input
            className={styles.input}
            value={formData.projectName}
            onChange={handleChange}
            name="projectName"
            placeholder="Type Project Name here. . ."
          />
          <label className={styles.label}>Description</label>
          <input
            className={styles.textarea}
            value={formData.description}
            onChange={handleChange}
            name="description"
            placeholder="Type Project Description here. . ."
          />
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Created By</label>
              <input
                className={styles.small_input}
                value={formData.createdBy}
                onChange={handleChange}
                name="createdBy"
                placeholder="Type Who Created The Project here. . ."
              />
            </div>
            <div>
              <label className={styles.label}>Topic</label>
              <input
                className={styles.small_input}
                value={formData.topic}
                onChange={handleChange}
                name="topic"
                placeholder="Type Project Topic here. . ."
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Status</label>
              <input
                className={styles.small_input}
                value={formData.status}
                onChange={handleChange}
                name="status"
                placeholder="Type Project Status here. . ."
              />
            </div>
            <div>
              <label className={styles.label}>Affiliate</label>
              <input
                className={styles.small_input}
                value={formData.affiliate}
                onChange={handleChange}
                name="affiliate"
                placeholder="Type Project Affiliate here. . ."
              />
            </div>
          </div>
        </div>
        <div className={styles.container_information}>
          <div className={styles.container_title}>Date Information</div>
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Start Date</label>
              <input
                className={styles.small_input}
                type="date"
                onChange={handleChange}
                value={formData.startDate}
                name="startDate"
              />
            </div>
            <div>
              <label className={styles.label}>End Date</label>
              <input
                className={styles.small_input}
                type="date"
                onChange={handleChange}
                value={formData.endDate}
                name="endDate"
              />
            </div>
          </div>
        </div>
        <div className={styles.container_information}>
          <div className={styles.container_title}>Additional Information</div>
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Professor Role</label>
              <select
                className={styles.small_input}
                value={formData.ProfessorRole}
                onChange={handleChange}
                name="ProfessorRole"
              >
                <option value="author">author</option>
                <option value="supervisor">supervisor</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>Type</label>
              <select
                className={styles.small_input}
                value={formData.type}
                name="type"
                onChange={handleChange}
              >
                <option value="ProfessorProject">Professor Project</option>
                <option value="GraduationProject">Graduation Project</option>
              </select>
            </div>
          </div>
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Department</label>
              <select
                className={styles.small_input}
                value={formData.departmentId}
                name="departmentId"
                onChange={handleSelect}
              >
                {departments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {`${item.name}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.btns_container}>
        <div onClick={() => navigate(-1)} className={styles.cancel_btn}>
          <CrossIcon />
          Cancel
        </div>
        <div className={styles.add_btn} onClick={handleSubmit}>
          <PlusIcon /> Add Project
        </div>
      </div>
    </div>
  );
};

export default AddProject;
