import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import styles from "./EnhancedTable.module.css";
import TrashIcon from "../../SVGs/TrashIcon";
import PenIcon from "../../SVGs/PenIcon";
import CrossIcon from "../../SVGs/CrossIcon";
import EditResearch from "../Researches/EditResearch";

export default function BasicTable(props) {
  const { ProfessorResearches, ProfessorProjects, type, handleDelete } = props;
  const [rows, setRows] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [itemId, setItemId] = React.useState();

  const handleOpenEdit = (id) => {
    setItemId(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (id) => {
    setItemId(id);
    setOpenDelete(true);
  };

  const onDlete = () => {
    handleDelete(itemId);
    setOpenDelete(false);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const fetchData = async () => {
    try {
      if (type === "Research") {
        setRows(ProfessorResearches);
      } else {
        setRows(ProfessorProjects);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [type, ProfessorResearches, ProfessorProjects]);


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TITLE</TableCell>
              <TableCell >CITED BY</TableCell>
              <TableCell >YEAR</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.map((row) => (
              <TableRow
                key={row.id || row.projectId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {type === "Research" ? (
                  <TableCell
                    component="th"
                    scope="row"
                    key={`research-${row.id || row.projectId}`}
                  >
                    {row.title}
                    <div key={`description-${row.id || row.projectId}`} className={styles.dis}>
                      {row.description}
                    </div>
                    <div key={`magazinName-${row.id || row.projectId}`} className={styles.dis}>
                      {row.magazineName}
                    </div>
                  </TableCell>
                ) : (
                  <TableCell
                    key={`project-${row.id || row.projectId}`}
                    className={styles.table_cell}
                    component="th"
                    scope="row"
                  >
                    {row.projectName}
                    <div key={`topic-${row.id || row.projectId}`} className={styles.dis}>
                      {row.topic}
                    </div>
                    <div key={`description-${row.id || row.projectId}`} className={styles.dis}>
                      {row.description}
                    </div>
                  </TableCell>
                )}
                <TableCell
                  key={`publisher-${row.id || row.projectId}`}
                  className={styles.table_cell}
                >
                  {row.createdBy}
                </TableCell>
                {type === "Research" ? (
                  <TableCell
                    key={`publishYear-${row.id || row.projectId}`}
                    className={styles.table_cell}
                  >
                    {row.publishYear}
                  </TableCell>
                ) : (
                  <TableCell
                    key={`publishYearp-${row.id || row.projectId}`}
                    className={styles.table_cell}
                  >
                    {parseInt(row.startDate?.slice(0, 4))}
                  </TableCell>
                )}
                <TableCell
                  key={`actions-${row.id || row.projectId}`}
                  className={styles.table_cell}
                  align="right"
                >
                  <div className={styles.icons_container}>
                    {/* <div onClick={() => handleOpenEdit(row.id || row.projectId)}>
                      <PenIcon />
                    </div> */}
                    <div onClick={() => handleOpenDelete(row.id || row.projectId)}>
                      <TrashIcon />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.delete_container}>
          <div className={styles.delete_title}>
            Are you sure you want to delete the {type} ?
          </div>
          <div className={styles.btns_container}>
            <div className={styles.cancel_btn} onClick={handleCloseDelete}>
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
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditResearch handleCloseEdit={handleCloseEdit} itemId={itemId} />
      </Modal>
    </>
  );
}
