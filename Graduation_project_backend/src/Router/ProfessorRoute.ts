import { Router } from 'express'
import ProfessorController from '../Controller/ProfessorController'
import tokenValidateMiddleware from '../middlewares/authMiddleware'
import upload from '../middlewares/uploadMiddleware'
const router = Router()
const tvm = tokenValidateMiddleware

router.get('/allProfessors', tvm, ProfessorController.getAllProfessors)
router.get('/getProfessorById/:id', tvm, ProfessorController.getProfessorById)
router.get('/getProfessor', tvm, ProfessorController.getProfessor)
router.put('/update/:id', tvm, ProfessorController.updateProfessor)
router.delete('/delete/:id', tvm, ProfessorController.deleteProfessor)
router.put('/updateProfessorImage', upload.single("photo"), tvm, ProfessorController.updateProfessorImage)

export default router

