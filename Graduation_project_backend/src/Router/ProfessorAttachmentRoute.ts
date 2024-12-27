import { Router } from "express";
import professorAttachmentController from "../Controller/ProfessorAttachmentController"
import tokenValidateMiddleware from '../middlewares/authMiddleware'
const tvm = tokenValidateMiddleware

const router = Router()

router.post('/create', tvm, professorAttachmentController.createProfessorAttachment)
router.get('/get/:id', tvm, professorAttachmentController.getProfessorAttachmentById)
router.get('/get', tvm, professorAttachmentController.getAllProfessorAttachment)
router.put('/update/:id', tvm, professorAttachmentController.updateProfessorAttachment)
router.delete('/delete/:id', tvm, professorAttachmentController.deleteProfessorAttachment)

export default router;