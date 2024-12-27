import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Professor_Positions {
    public static getAllProfessor_Positions = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const professor_positions = await prisma.professor_Positions.findMany()
            return sendResponse(response, 200, "success", professor_positions)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get professor_positions.", err)
        }
    }

    public static getProfessor_PositionsByProfessorId = async (
      request : Request,
      response : Response
  ) => {
    const id = parseInt(request.params.id as string);

      try {
          const professor_positions = await prisma.professor_Positions.findMany({
              where : {
                professorId:id
              }
          })
          return sendResponse(response, 200, "success", professor_positions)
      } catch (err : unknown) {
          return sendResponse(response, 404, "error can't get professor_positions invalid id.", err)
      }
  }

    public static getProfessor_PositionsById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const professor_positions = await prisma.professor_Positions.findUnique({
                where : {
                    positionId:id
                }
            })
            return sendResponse(response, 200, "success", professor_positions)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get professor_positions invalid id.", err)
        }
    }

    public static updateProfessor_Positions = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name, type, startDate, endDate, professorId} = request.body
            const id = parseInt(request.params.id as string);
            const professor_positions = await prisma.professor_Positions.update({
                where : {
                    positionId:id
                },
                data : {
                    name,
                    type,
                    startDate,
                    endDate,
                    professorId
                }
            })
            return sendResponse(response, 200, "success", professor_positions)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update professor_positions.", err)
        }
    }

    public static deleteProfessor_Positions = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const professor_positions = await prisma.professor_Positions.delete({
                where : {
                    positionId:id
                }
            })
            return sendResponse(response, 200, "success", professor_positions)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete professor_positions.", err)
        }
    }

    public static createProfessor_Positions = async (
        request: Request,
        response: Response
    ) => {
        try {
            const professorId = parseInt(request.body.decoded.user.id as string);
            const {name, type, startDate, endDate} = request.body
            const professor_positions = await prisma.professor_Positions.create({
                data : {
                    name,
                    type,
                    startDate,
                    endDate,
                    professorId
                }
            })
            return sendResponse(response, 200, "success", professor_positions)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't create professor_positions.", err)
        }
    }
}

export default Professor_Positions