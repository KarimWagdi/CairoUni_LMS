import ProfessorRoute from "./ProfessorRoute"
import DepartmentRoute from "./DepartmentRoute"
import ResearchRoute from "./ResearchRoute"
// import StudentRoute from "./StudentRoute"
import ProjectRoute from "./ProjectRoute"
import ProfessorAttachmentRoute from './ProfessorAttachmentRoute'
import AuthRoute from "./AuthRoute"
import AnswerRoute from "./AnswerRoute"
import QuestionRoute from "./QuestionRoute"
import ResponsesRoute from "./ResponsesRoute"
import ServayRoute from "./SurveyRoute"
import UserServay from "./UserSurveyRoute"
import Professor_Positions from "./Professor_Positions"
import Professor_Awards from "./Professor_Awards"
import ResetPassword from "./ResetPassword"
import search from "./SearchRoute"
import  { Router, Request, Response } from "express";
import path from "path"

const routes = Router()

routes.use('/auth', AuthRoute)
routes.use('/professor', ProfessorRoute)
routes.use('/project', ProjectRoute)
routes.use('/department', DepartmentRoute)
routes.use('/research', ResearchRoute)
// routes.use('/student',StudentRoute)
routes.use('/professorAttachment',ProfessorAttachmentRoute)
routes.use('/answer', AnswerRoute)
routes.use('/question', QuestionRoute)
routes.use('/responses', ResponsesRoute)
routes.use('/survey', ServayRoute)
routes.use('/userSurvey', UserServay)
routes.use('/professor_positions', Professor_Positions);
routes.use('/professor_awards', Professor_Awards);
routes.use('/resetPassword', ResetPassword);
routes.get('/images/:filename', (req: Request, res: Response) => {
    const filename = req.params.filename;
    
    const imagePath = path.join(__dirname, '..', '..', 'public', 'uploads', filename);
    res.sendFile(imagePath);
});
routes.use('/search', search)

export default routes

