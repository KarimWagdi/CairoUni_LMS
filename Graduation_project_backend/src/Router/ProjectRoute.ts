import { Router } from 'express'
import ProjectsController from '../Controller/ProjectController'
import tokenValidateMiddleware from '../middlewares/authMiddleware'
const router = Router()
const tvm = tokenValidateMiddleware

router.post('/create', tvm, ProjectsController.createProject)
router.get('/allProjects', tvm, ProjectsController.getAllProjects)
router.get('/getProjectsById/:id', tvm, ProjectsController.getProjectById)
router.get('/getProjectsByAuthorIdOrSupervisorId/:id', ProjectsController.getProjectsByAuthorIdOrSupervisorId)
router.put('/update/:id', tvm, ProjectsController.updateProject)
router.delete('/delete/:id', tvm, ProjectsController.deleteProject)
router.get('/getProjectsByAuthorIdOrSupervisorId/:id', tvm, ProjectsController.getProjectsByAuthorIdOrSupervisorId)

export default router
