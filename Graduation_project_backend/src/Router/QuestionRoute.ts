import { Router } from "express";
import QuestionController from "../Controller/QuestionController";
import tokenValidateMiddleware from "../middlewares/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', tvm, QuestionController.createQuestion)
router.get('/get', tvm, QuestionController.getAllQuestions)
router.get('/get/:id', tvm, QuestionController.getQuestionById)
router.put('/update/:id', tvm, QuestionController.updateQuestion)
router.delete('/delete/:id', tvm, QuestionController.deleteQuestion)

export default router;
