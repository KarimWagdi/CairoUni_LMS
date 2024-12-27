import { Router } from 'express'
import tokenValidateMiddleware from '../middlewares/authMiddleware'
import { SearchController } from '../Controller/SearchController'
const router = Router()
const tvm = tokenValidateMiddleware

router.get('/get', tvm, SearchController.search)

export default router

