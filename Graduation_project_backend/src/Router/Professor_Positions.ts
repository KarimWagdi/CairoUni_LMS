import { Router } from "express";
import Professor_Positions from "../Controller/Professor_Positions"
import tokenValidateMiddleware from "../middlewares/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', tvm, Professor_Positions.createProfessor_Positions)
router.get('/get', tvm, Professor_Positions.getAllProfessor_Positions)
router.get('/getByProfessorId/:id', tvm, Professor_Positions.getProfessor_PositionsByProfessorId)
router.get('/get/:id', tvm, Professor_Positions.getProfessor_PositionsById)
router.put('/update/:id', tvm, Professor_Positions.updateProfessor_Positions)
router.delete('/delete/:id', tvm, Professor_Positions.deleteProfessor_Positions)

export default router;