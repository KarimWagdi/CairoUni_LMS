import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styles from "./profile.module.css";
import profile_img from "../../assets/Home/profile.svg";
import Line from "../../SVGs/Line";
import EmailIcon from "../../SVGs/EmailIcon2";
import PhoneIcon from "../../SVGs/PhoneIcon";
import SpecialtyIcon from "../../SVGs/SpecialtyIcon";
import ExportIcon from "../../SVGs/ExportIcon";
import DepartmentIcon from "../../SVGs/DepartmentIcon";
import PlusIcon from "../../SVGs/PlusIcon2";
import PenIcon from "../../SVGs/PenIcon2";
import TrashIcon2 from "../../SVGs/TrashIcon2";
import CrossIcon from "../../SVGs/CrossIcon";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import EditProfile from "../Home/EditProfile";
import * as professor from "../../api/professor";
import * as research from "../../api/research";
import * as project from "../../api/projects";
import * as professor_positions from "../../api/ProfessorPositions";
import * as professor_awards from "../../api/ProfessorAwards";
import EditResearch from "../Researches/EditResearch";
import AddImage from "../../SVGs/AddImage";
import EditProject from "../Projects/EditProject";

const drawerWidth = 264;

const Profile = ({ professorData }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [ProfessorResearches, setProfessorResearches] = useState([]);
  const [ProfessorProjects, setProfessorProjects] = useState([]);
  const [professorPositions, setProfessorPositions] = useState([]);
  const [professorAwards, setProfessorAwards] = useState([]);
  const [itemId, setItemId] = useState();
  const [openEditR, setOpenEditR] = useState(false);
  const [openEditP, setOpenEditP] = useState(false);
  const [openAddPosition, setopenAddPosition] = useState(false);
  const [openDeleteR, setOpenDeleteR] = useState(false);
  const [openAddAward, setopenAddAward] = useState(false);
  const [type, setType] = useState("research");
  const [prof, setProf] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    type: "Internal_position",
    startDate: "",
    endDate: "",
  });

  const [formDataAwards, setFormDataAwards] = useState({
    name: "",
    field: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeAwards = (e) => {
    setFormDataAwards({ ...formDataAwards, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    professor.updateProfessorImage(formData).then(() => {
      location.reload();
    });
  };
  const handleDeleteR = (id) => {
    research.deleteResearch(id).then(() => {
      location.reload();
    });
  };
  const handleDeletePos = (id) => {
    professor_positions.deleteById(id).then(() => {
      location.reload();
    });
  };
  const handleDeleteA = (id) => {
    professor_awards.deleteById(id).then(() => {
      location.reload();
    });
  };
  const handleOpenDeleteA = (id) => {
    setItemId(id);
    setOpenDeleteR(true);
    setType("award");
  };
  const handleDeleteP = (id) => {
    project.deleteProject(id).then(() => {
      location.reload();
    });
  };
  const handleOpenDeletePos = (id) => {
    setItemId(id);
    setType("position");
    setOpenDeleteR(true);
  };
  const handleOpenEditR = (id) => {
    setItemId(id);
    setOpenEditR(true);
  };
  const handleOpenEditP = (id) => {
    setItemId(id);
    setOpenEditP(true);
  };
  const handleSubmit = () => {
    for (let key in formData) {
      if (formData[key] === "") {
        alert("please fill all fields");
        return;
      }
    }
    professor_positions.create(formData).then(() => {
      location.reload();
    });
  };

  const handleSubmitAwards = () => {
    console.log(formDataAwards);
    for (let key in formDataAwards) {
      if (formDataAwards[key] === "") {
        alert("please fill all fields");
        return;
      }
    }
    professor_awards.create(formDataAwards).then(() => {
      location.reload();
    });
  };

  const handleCloseEditP = () => setOpenEditP(false);

  const handleCloseEditR = () => setOpenEditR(false);
  const handleCloseAddPosition = () => setopenAddPosition(false);
  const handleopenAddPosition = () => setopenAddPosition(true);

  const handleCloseDeleteR = () => setOpenDeleteR(false);

  const handleOpenDeleteR = (id) => {
    setItemId(id);
    setOpenDeleteR(true);
  };
  const handleOpenDeleteP = (id) => {
    setItemId(id);
    setOpenDeleteR(true);
    setType("project");
  };
  const onDlete = () => {
    if (type === "research") handleDeleteR(itemId);
    else if (type === "position") handleDeletePos(itemId);
    else if (type === "award") handleDeleteA(itemId);
    else if (type === "project") handleDeleteP(itemId);
    setOpenDeleteR(false);
  };

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenAddAward = () => setopenAddAward(true);
  const handleCloseAddAward = () => setopenAddAward(false);

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

  const onUpdate = async (id, fullName, specialty, phoneNumber, image) => {
    try {
      await professor.updateProfessor(
        id,
        fullName,
        specialty,
        phoneNumber,
        image
      );
      console.log("Update successful");
    } catch (error) {
      console.error("Error updating professor:", error);
    }
  };
  const handleUpdateProfAttach = async (
    id,
    ssn,
    degreeDate,
    degreeUniversity,
    gender,
    degree
  ) => {
    try {
      await professor.updateProfessorAttach(
        id,
        ssn,
        degreeDate,
        degreeUniversity,
        gender,
        degree
      );
      console.log("Update successful");
    } catch (error) {
      console.error("Error updating professor:", error);
    }
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
        <div className={styles.title}>Profile</div>
        <div className={styles.export_bt_container}>
          <div onClick={handleOpenEdit} className={styles.edit_bt}>
            <PenIcon /> Edit
          </div>
          <Link to="/home/profile/template" className={styles.export_bt}>
            <ExportIcon />
            Export
          </Link>
        </div>
        <div className={styles.container}>
          <div className={styles.info_container}>
            <div className={styles.img_bg}></div>
            <div className={styles.img_container}>
              <img src={prof?.image ? prof.image : profile_img} />{" "}
              <div className={styles.add_img_btn} onClick={handleImageClick}>
                <AddImage />{" "}
              </div>
              <input
                type="file"
                id="file"
                style={{ visibility: "hidden" }}
                onChange={handleUpload}
              />
            </div>
            <div className={styles.prof_name}>{prof?.fullName}</div>
            <Line />
            <div className={styles.info_container2}>
              <div className={styles.icon_bg}>
                <EmailIcon />
              </div>
              <div>
                <div className={styles.lable}>Email</div>
                <div className={styles.info}>{prof?.email}</div>{" "}
              </div>
            </div>
            <div className={styles.info_container2}>
              <div className={styles.icon_bg}>
                <PhoneIcon />
              </div>
              <div>
                <div className={styles.lable}>Phone Number</div>
                <div className={styles.info}>{prof?.phoneNumber}</div>
              </div>
            </div>
            <div className={styles.info_container2}>
              <div className={styles.icon_bg}>
                <SpecialtyIcon />
              </div>
              <div>
                <div className={styles.lable}>Specialty</div>
                <div className={styles.info}>{prof?.specialty}</div>
              </div>
            </div>
            <div className={styles.info_container2}>
              <div className={styles.icon_bg}>
                <DepartmentIcon />
              </div>
              <div>
                <div className={styles.lable}>Department</div>
                <div className={styles.info}>{prof?.department?.name}</div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.Item_container}>
              <div className={styles.title_and_addBt}>
                <div className={styles.Item_title}>Researches</div>
                <Link to="/home/researchs/add" className={styles.add_btn}>
                  <PlusIcon />
                  Add
                </Link>
              </div>
              {ProfessorResearches.map((researchItem) => (
                <div key={researchItem.id} className={styles.name_and_icons}>
                  <div>
                    <div className={styles.single_Item_name}>
                      {researchItem.title}
                    </div>
                    <div className={styles.des}>{researchItem.description}</div>
                  </div>
                  <div className={styles.Icons_container}>
                    {/* <div
                        className={styles.icon}
                        onClick={() => handleOpenEditR(researchItem.id)}
                      >
                        <PenIcon />
                      </div> */}
                    <div
                      className={styles.icon}
                      onClick={() => handleOpenDeleteR(researchItem.id)}
                    >
                      <TrashIcon2 />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.Item_container}>
              <div className={styles.title_and_addBt}>
                <div className={styles.Item_title}>Projects</div>
                <Link to="/home/projects/add" className={styles.add_btn}>
                  <PlusIcon />
                  Add
                </Link>
              </div>
              {ProfessorProjects.map((projectsItem) => (
                <div
                  key={projectsItem.projectId}
                  className={styles.name_and_icons}
                >
                  <div>
                    <div className={styles.single_Item_name}>
                      {projectsItem.projectName}
                    </div>
                    <div className={styles.des}>{projectsItem.description}</div>
                  </div>
                  <div className={styles.Icons_container}>
                    {/* <div
                        className={styles.icon}
                        onClick={() => handleOpenEditP(projectsItem.projectId)}
                      >
                        <PenIcon />
                      </div> */}
                    <div
                      className={styles.icon}
                      onClick={() => handleOpenDeleteP(projectsItem.projectId)}
                    >
                      <TrashIcon2 />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.Item_container}>
              <div className={styles.title_and_addBt}>
                <div className={styles.Item_title}>Positions</div>
                <div className={styles.add_btn} onClick={handleopenAddPosition}>
                  <PlusIcon />
                  Add
                </div>
              </div>
              {professorPositions.map((positionsItem) => (
                <div
                  key={positionsItem.positionId}
                  className={styles.name_and_icons}
                >
                  <div>
                    <div className={styles.single_Item_name}>
                      {positionsItem.name}
                    </div>
                    <div className={styles.des}>
                      {positionsItem.startDate} - {positionsItem.endDate}
                    </div>
                  </div>
                  <div className={styles.Icons_container}>
                    {/* <div
                        className={styles.icon}
                        onClick={() => handleOpenEditR(positionsItem.positionId)}
                      >
                        <PenIcon />
                      </div> */}
                    <div
                      className={styles.icon}
                      onClick={() =>
                        handleOpenDeletePos(positionsItem.positionId)
                      }
                    >
                      <TrashIcon2 />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.Item_container}>
              <div className={styles.title_and_addBt}>
                <div className={styles.Item_title}>Awards</div>
                <div onClick={handleOpenAddAward} className={styles.add_btn}>
                  <PlusIcon />
                  Add
                </div>
              </div>
              {professorAwards.map((AwardItem) => (
                <div key={AwardItem.id} className={styles.name_and_icons}>
                  <div>
                    <div className={styles.single_Item_name}>
                      {AwardItem.name}
                    </div>
                    <div className={styles.des}>{AwardItem.field}</div>
                    <div className={styles.des}>{AwardItem.date}</div>
                  </div>
                  <div className={styles.Icons_container}>
                    {/* <div
                        className={styles.icon}
                        onClick={() => handleOpenEditR(AwardItem.awardId)}
                      >
                        <PenIcon />
                      </div> */}
                    <div
                      className={styles.icon}
                      onClick={() => handleOpenDeleteA(AwardItem.awardId)}
                    >
                      <TrashIcon2 />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProfile
          handleUpdateProfAttach={handleUpdateProfAttach}
          onUpdate={onUpdate}
          professorData={prof}
          handleCloseEdit={handleCloseEdit}
        />
      </Modal>
      <Modal
        open={openEditR}
        onClose={handleCloseEditR}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditResearch handleCloseEdit={handleCloseEditR} itemId={itemId} />
      </Modal>
      <Modal
        open={openDeleteR}
        onClose={handleCloseDeleteR}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.delete_container}>
          <div className={styles.delete_title}>
            Are you sure you want to delete the {type} ?
          </div>
          <div className={styles.btns_container}>
            <div className={styles.cancel_btn} onClick={handleCloseDeleteR}>
              <CrossIcon />
              Cancel
            </div>
            <div className={styles.delete_btn} onClick={onDlete}>
              Delete
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={openAddPosition}
        onClose={handleCloseAddPosition}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.add_container}>
          <div className={styles.title}>Add Position</div>
          <div className={styles.btns_container}>
            <div>
              <label className={styles.label}>Position Type</label>
              <select
                className={styles.small_input}
                name="type"
                onChange={handleChange}
              >
                <option value="Internal_position">Internal Position</option>
                <option value="External_position">External Position</option>
              </select>
            </div>
            <div>
              <label className={styles.label}>Position Name</label>
              <input
                className={styles.small_input}
                name="name"
                type="text"
                placeholder="Enter Your Position Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.btns_container}>
            <div>
              <label className={styles.label}>Start Date</label>
              <input
                className={styles.small_input}
                type="date"
                name="startDate"
                onChange={handleChange}
                value={formData.startDate}
              />
            </div>
            <div>
              <label className={styles.label}>End Date</label>
              <input
                className={styles.small_input}
                type="date"
                name={"endDate"}
                onChange={handleChange}
                value={formData.endDate}
              />
            </div>
          </div>
          <br />
          <div className={styles.btns_container}>
            <div className={styles.cancel_btn} onClick={handleCloseAddPosition}>
              <CrossIcon />
              Cancel
            </div>
            <div className={styles.btn} onClick={handleSubmit}>
              Add
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={openAddAward}
        onClose={handleCloseAddAward}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.add_container}>
          <div className={styles.title}>Add Award</div>
          <div className={styles.btns_container}>
            <div>
              <label className={styles.label}>Award Name</label>
              <input
                className={styles.small_input}
                type="text"
                placeholder="Enter The Award Name"
                name="name"
                onChange={handleChangeAwards}
              />
            </div>
            <div>
              <label className={styles.label}>Award Field</label>
              <input
                className={styles.small_input}
                type="text"
                placeholder="Enter The Award Field"
                name="field"
                onChange={handleChangeAwards}
              />
            </div>
          </div>
          <div className={styles.btns_container}>
            <div>
              <label className={styles.label}>Award Date</label>
              <input
                className={styles.small_input}
                type="date"
                name="date"
                onChange={handleChangeAwards}
              />
            </div>
          </div>
          <br />
          <div className={styles.btns_container}>
            <div className={styles.cancel_btn} onClick={handleCloseAddAward}>
              <CrossIcon />
              Cancel
            </div>
            <div className={styles.btn} onClick={handleSubmitAwards}>
              Add
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={openEditP}
        onClose={handleCloseEditP}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProject handleCloseEdit={handleCloseEditP} projectId={itemId} />
      </Modal>
    </>
  );
};

export default Profile;
