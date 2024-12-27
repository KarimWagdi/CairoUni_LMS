import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Answer {
    public static createAnswer = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {text,questionId} = request.body as {text:string,questionId:number}
            const answerCreated = await prisma.answer.create({
                data : {
                    text,
                    questionId
                }
            });
            return sendResponse(response, 200, 'success', answerCreated)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create answer.", err)
        }
    }

    public static getAllAnswers = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const answers = await prisma.answer.findMany()
            return sendResponse(response, 200, "success", answers)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get answers.", err)
        }
    }

    public static getAnswerById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const answer = await prisma.answer.findUnique({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", answer)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get answer invalid id.", err)
        }
    }

    public static updateAnswer = async (
        request: Request,
        response: Response
    ) => {
        try {
            const text = request.body.text
            const id = parseInt(request.params.id as string);
            const answer = await prisma.answer.update({
                where : {
                    id
                },
                data : {
                    text
                }
            })
            return sendResponse(response, 200, "success", answer)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update answer invalid id.", err)
        }
    }

    public static deleteAnswer = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const answer = await prisma.answer.delete({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", answer)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete answer invalid id.", err)
        }
    }

    public static getAnswersByQuestionId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const questionId = parseInt(request.params.questionId as string);
            const answers = await prisma.answer.findMany({
                where : {
                    questionId
                }
            })
            return sendResponse(response, 200, "success", answers)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get answers invalid id.", err)
        }
    }
}

export default Answer