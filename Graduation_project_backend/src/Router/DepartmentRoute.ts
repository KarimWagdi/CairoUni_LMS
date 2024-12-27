import { Router } from "express";
import departmentController from "../Controller/DepartmentController"
import tokenValidateMiddleware from "../middlewares/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', departmentController.createDepartment)
router.get('/get/:id', tvm, departmentController.getDepartmentById)
router.get('/get', departmentController.getAllDepartments)
router.put('/update/:id', tvm, departmentController.updateDepartment)
router.delete('/delete/:id', tvm, departmentController.deleteDepartment)

export default router;