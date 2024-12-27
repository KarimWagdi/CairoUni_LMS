import { Router } from "express";
import AnswerController from "../Controller/AnswerController";
import tokenValidateMiddleware from "../middlewares/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', tvm, AnswerController.createAnswer)
router.get('/get', tvm, AnswerController.getAllAnswers)
router.get('/get/:id', tvm, AnswerController.getAnswerById)
router.put('/update/:id', tvm, AnswerController.updateAnswer)
router.delete('/delete/:id', tvm, AnswerController.deleteAnswer)

export default router;