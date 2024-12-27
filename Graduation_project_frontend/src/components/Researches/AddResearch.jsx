import styles from "./AddResearch.module.css";
import CrossIcon from "../../SVGs/CrossIcon";
import PlusIcon from "../../SVGs/PlusIcon";
import { useState, useEffect } from "react";
import { getDepartments } from "../../api/department";
import { createResearch } from "../../api/research";
import { useNavigate } from "react-router-dom";

const AddResearch = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    createdBy: "",
    pagesNumber: "",
    publisher: "",
    magazineName: "",
    magazineVolume: "",
    publishYear:"",
    majoring: "",
    masterStudentCode:null,
    ProfessorRole: "author",
    type: "Master",
    departmentId: 1,
  });
  const [departments, setDepartments] = useState([]);
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

  const handleChangeNums = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value),
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
          return alert("Please fill all fields");
        }
      }
      const response = await createResearch(formData).then(()=>navigate(-1));
    } catch (error) {
      console.error("Error creating research:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Add Research</div>
      <div className={styles.btns_container}>
        <div onClick={() => navigate(-1)} className={styles.cancel_btn}>
          <CrossIcon />
          Cancel
        </div>
        <div className={styles.add_btn} onClick={handleSubmit}>
          <PlusIcon /> Add Research
        </div>
      </div>
      <form className={styles.form_container}>
        <div className={styles.container_information}>
          <div className={styles.container_title}>General Information</div>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            value={formData.title}
            onChange={handleChange}
            name="title"
            placeholder="Type Research Title here. . ."
          />
          <label className={styles.label}>Description</label>
          <input
            className={styles.textarea}
            value={formData.description}
            onChange={handleChange}
            name="description"
            placeholder="Type Research Description here. . ."
          />
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Created By</label>
              <input
                className={styles.small_input}
                value={formData.createdBy}
                onChange={handleChange}
                name="createdBy"
                placeholder="Type Who Create The Research here. . ."
              />
            </div>
            <div>
              <label className={styles.label}>Majoring</label>
              <input
                className={styles.small_input}
                value={formData.majoring}
                onChange={handleChange}
                name="majoring"
                placeholder="Type Major Research here. . ."
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
                placeholder="Type Research Status here. . ."
              />
            </div>
            <div>
              <label className={styles.label}>Pages Number</label>
              <input
                className={styles.small_input}
                type="number"
                value={formData.pagesNumber}
                onChange={handleChangeNums}
                name="pagesNumber"
                placeholder="Type Research Pages Number here. . ."
              />
            </div>
          </div>
        </div>
        <div className={styles.container_information}>
          <div className={styles.container_title}>Publish Information</div>
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Publisher</label>
              <input
                className={styles.small_input}
                value={formData.publisher}
                onChange={handleChange}
                name="publisher"
                placeholder="Type Publisher Research here. . ."
              />
            </div>
            <div>
              <label className={styles.label}>Publish Year</label>
              <input
                className={styles.small_input}
                type="number"
                value={formData.publishYear}
                onChange={handleChangeNums}
                name="publishYear"
                placeholder="Type Publish Year Research here. . ."
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div>
              <label className={styles.label}>Magazine Name</label>
              <input
                className={styles.small_input}
                value={formData.magazineName}
                onChange={handleChange}
                name="magazineName"
                placeholder="Type Magazine Name Research here. . ."
              />
            </div>
            <div>
              <label className={styles.label}>Magazine Volume</label>
              <input
                className={styles.small_input}
                value={formData.magazineVolume}
                onChange={handleChange}
                name="magazineVolume"
                placeholder="Type Magazine Volume Research here. . ."
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
                <option value="author">Author</option>
                <option value="supervisor">Supervisor</option>
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
                <option value="Master">Master</option>
                <option value="ProfessorResearch">Professor Research</option>
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
          <PlusIcon /> Add Research
        </div>
      </div>
    </div>
  );
};

export default AddResearch;
