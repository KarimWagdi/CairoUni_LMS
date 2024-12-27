import { Router } from "express";
import userSurveyController from "../Controller/UserSurveyController";
import tokenValidateMiddleware from "../middlewares/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create/:id', tvm, userSurveyController.create)
router.get('/get', tvm, userSurveyController.getAll)
router.get('/get/:id', tvm, userSurveyController.getById)
router.put('/update/:id', tvm, userSurveyController.update)
router.put('/updateComplete/:id', tvm, userSurveyController.updateComplete)
router.delete('/delete/:id', tvm, userSurveyController.delete)
router.get('/getBySurveyId/:id', tvm, userSurveyController.getBySurveyId)
router.get('/getByProfessortId/:id', tvm, userSurveyController.getByProfessorId)
router.get('/getProfessorSurveys', tvm, userSurveyController.getProfessorSurvey)

export default router;