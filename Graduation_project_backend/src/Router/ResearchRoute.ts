import { Router } from 'express'
import ResearchController from '../Controller/ResearchController'
import tokenValidateMiddleware from '../middlewares/authMiddleware'
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', tvm, ResearchController.createResearch)
router.get('/getAll', tvm, ResearchController.getAllResearches)
router.get('/getById/:id', tvm, ResearchController.getResearchById)
router.put('/update/:id', tvm, ResearchController.updateResearch)
router.delete('/delete/:id', tvm, ResearchController.deleteResearch)
// router.get('/getByMasterStudentId/:id', tvm, ResearchController.getResearchByMasterStudentId)
router.get('/getByDepartmentId/:id', tvm, ResearchController.getResearchByDepartmentId)
router.get('/getByTypeId/:id', tvm, ResearchController.getResearchByTypeId)
// router.get('/getByAuthorId/:id', tvm, ResearchController.getResearchsByAuthorId)
// router.get('/getBySupervisorId/:id', tvm, ResearchController.getResearchsBySupervisorId)
router.get('/getResearchByAuthorIdORsupervisorId/:id', tvm, ResearchController.getResearchByAuthorIdORsupervisorId)

export default router
