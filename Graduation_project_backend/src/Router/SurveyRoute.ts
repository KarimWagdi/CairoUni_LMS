import { Router } from "express";
import SurveyController from "../Controller/SurveyController";
import tokenValidateMiddleware from "../middlewares/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', tvm, SurveyController.createSurvey)
router.get('/get', tvm, SurveyController.getAllSurveys)
router.get('/get/:id', tvm, SurveyController.getSurveyById)
router.put('/update/:id', tvm, SurveyController.updateSurvey)
router.delete('/delete/:id', tvm, SurveyController.deleteSurvey)

export default router;