import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Responses {
    public static createResponse = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {answerId} = request.body as {answerId:number}
            const professorId = request.body.decoded.user.id as number;
            const responseCreated = await prisma.response.create({
                data : {
                    answerId,
                    professorId
                }
            });
            return sendResponse(response, 200, 'success', responseCreated)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create response.", err)
        }
    }

    public static getAllResponses = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const responses = await prisma.response.findMany()
            return sendResponse(response, 200, "success", responses)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get responses.", err)
        }
    }

    public static getResponseById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const responses = await prisma.response.findUnique({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", responses)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get response invalid id.", err)
        }
    }

    public static deleteResponse = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const responseDeleted = await prisma.response.delete({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", responseDeleted)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete response invalid id.", err)
        }
    }

    public static getResponsesByAnswerId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const answerId = parseInt(request.params.answerId as string);
            const responses = await prisma.response.findMany({
                where : {
                    answerId
                }
            })
            return sendResponse(response, 200, "success", responses)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get responses invalid id.", err)
        }
    }

    public static getResponsesByProfessorId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const professorId = parseInt(request.params.professorId as string);
            const responses = await prisma.response.findMany({
                where : {
                    professorId
                }
            })
            return sendResponse(response, 200, "success", responses)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get responses invalid id.", err)
        }
    }
}

export default Responses