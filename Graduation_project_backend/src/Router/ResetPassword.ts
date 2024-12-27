import { Router } from 'express'
import ResetPassword from '../Controller/ResetPassword'

const router = Router()

router.post('/sendResetToken', ResetPassword.SendResetToken)
router.post('/validateResetToken', ResetPassword.ValidateResetToken)
router.post('/resetPassword', ResetPassword.ResetPassword)

export default router