import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Question {
    public static createQuestion = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {text, surveyId} = request.body as {text:string, surveyId:number}
            const questionCreated = await prisma.question.create({
                data : {
                    text,
                    surveyId
                }
            });
            return sendResponse(response, 200, 'success', questionCreated)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create question.", err)
        }
    }

    public static getAllQuestions = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const questions = await prisma.question.findMany()
            return sendResponse(response, 200, "success", questions)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get questions.", err)
        }
    }

    public static getQuestionById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const question = await prisma.question.findUnique({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", question)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get question invalid id.", err)
        }
    }

    public static updateQuestion = async (
        request: Request,
        response: Response
    ) => {
        try {
            const text = request.body.text
            const id = parseInt(request.params.id as string);
            const question = await prisma.question.update({
                where : {
                    id
                },
                data : {
                    text
                }
            })
            return sendResponse(response, 200, "success", question)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update question invalid id.", err)
        }
    }

    public static deleteQuestion = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const question = await prisma.question.delete({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", question)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete question invalid id.", err)
        }
    }
}

export default Question 