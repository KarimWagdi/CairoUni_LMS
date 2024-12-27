import { Router } from 'express'
import AuthController from '../Controller/AuthController'
import tokenValidateMiddleware from '../middlewares/authMiddleware'
const router = Router()
const tvm = tokenValidateMiddleware


router.post('/login', AuthController.login)
router.post('/createUser', AuthController.createUser)

export default router