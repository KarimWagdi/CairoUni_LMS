import { Router } from "express";
import ResponsesController from "../Controller/ResponsesController";
import tokenValidateMiddleware from "../middlewares/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', tvm, ResponsesController.createResponse)
router.get('/get', tvm, ResponsesController.getAllResponses)
router.get('/get/:id', tvm, ResponsesController.getResponseById)
router.delete('/delete/:id', tvm, ResponsesController.deleteResponse)
export default router;