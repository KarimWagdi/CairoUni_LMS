import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Professor_Awards {
    public static getAllProfessor_Awards = async (
        request: Request,
        response: Response
    ) => {
        try {
            const professor_awards = await prisma.professor_Awards.findMany();
            return sendResponse(response, 200, "success",professor_awards)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get professor_awards.", err)
        }
    }

    public static getProfessor_AwardsByProfessorId = async (
      request : Request,
      response : Response
  ) => {
    const id = parseInt(request.params.id as string);

      try {
          const professor_positions = await prisma.professor_Awards.findMany({
              where : {
                professorId:id
              }
          })
          return sendResponse(response, 200, "success", professor_positions)
      } catch (err : unknown) {
          return sendResponse(response, 404, "error can't get professor_positions invalid id.", err)
      }
  }

    public static getProfessor_AwardsById = async (
        request: Request,
        response: Response
    ) => {
        const id = parseInt(request.params.id as string);

        try {
            const professor_awards = await prisma.professor_Awards.findUnique({
                where : {
                    awardId:id
                }
            })
            return sendResponse(response, 200, "success", professor_awards)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get professor_awards invalid id.", err)
        }
    }

    public static updateProfessor_Awards = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name, date, professorId, field} = request.body
            const id = parseInt(request.params.id as string);
            const professor_awards = await prisma.professor_Awards.update({
                where : {
                    awardId:id
                },
                data : {
                    name,
                    date,
                    professorId,
                    field
                }
            })
            return sendResponse(response, 200, "success", professor_awards)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update professor_awards.", err)
        }
    }

    public static deleteProfessor_Awards = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const professor_awards = await prisma.professor_Awards.delete({
                where : {
                    awardId:id
                }
            })
            return sendResponse(response, 200, "success", professor_awards)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete professor_awards.", err)
        }
    }

    public static createProfessor_Awards = async (
        request: Request,
        response: Response
    ) => {
        try {
            const professorId = parseInt(request.body.decoded.user.id as string);
            const {name, date, field} = request.body
            const professor_awards = await prisma.professor_Awards.create({
                data : {
                    name,
                    date,
                    professorId,
                    field
                }
            })
            return sendResponse(response, 200, "success", professor_awards)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't create professor_awards.", err)
        }
    }
}

export default Professor_Awards