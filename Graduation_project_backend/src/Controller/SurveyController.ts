import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Survey {
    public static createSurvey = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name} = request.body as {name:string}
            const surveyCreated = await prisma.survey.create({
                data : {
                    name
                }
            });
            return sendResponse(response, 200, 'success', surveyCreated)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create survey.", err)
        }
    }

    public static getAllSurveys = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const surveys = await prisma.survey.findMany()
            return sendResponse(response, 200, "success", surveys)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get surveys.", err)
        }
    }

    public static getSurveyById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const survey = await prisma.survey.findUnique({
                where : {
                    id
                },include : {
                    questions : {
                        include : {
                            answers : true
                        }
                    }
                }
            })
            return sendResponse(response, 200, "success", survey)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get survey invalid id.", err)
        }
    }

    public static updateSurvey = async (
        request: Request,
        response: Response
    ) => {
        try {
            const name = request.body.name
            const id = parseInt(request.params.id as string);
            const survey = await prisma.survey.update({
                where : {
                    id
                },
                data : {
                    name
                }
            })
            return sendResponse(response, 200, "success", survey)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update survey invalid id.", err)
        }
    }

    public static deleteSurvey = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const surveyDeleted = await prisma.survey.delete({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", surveyDeleted)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete survey invalid id.", err)
        }
    }
}

export default Survey