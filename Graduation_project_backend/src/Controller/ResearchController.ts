import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../helper/sendResponse';

const prisma = new PrismaClient();

class ResearchController {
    public static createResearch = async (
        request: Request,
        response: Response
    ) => {
        try {
            const professorId = parseInt(request.body.decoded.user.id as string), departmentId = parseInt(request.body.decoded.user.departmentId as string);
            const {title, description, startDate, endDate, status, createdBy, pagesNumber, publisher, magazineName, magazineVolume, publishYear, majoring, ProfessorRole, type} = request.body;
            const research = await prisma.research.create({ data: {title, createdBy, departmentId, description, endDate, magazineName, magazineVolume, majoring, pagesNumber, ProfessorRole, publisher, publishYear, startDate, status, type,professorId:professorId} });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 405, "error can't create research.", error);
        }
    }

    public static getAllResearches = async (
        request: Request,
        response: Response
    ) => {
        try {
            const researches = await prisma.research.findMany();
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches.", error);
        }
    }

    public static getResearchById = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const research = await prisma.research.findUnique({
                where: {
                    id
                },
            });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 404, "error can't get research invalid id.", error);
        }
    }
    public static getResearchByAuthorIdORsupervisorId = async (
      request: Request,
      response: Response
  ) => {
      try {
        const id = parseInt(request.params.id as string);

          const research = await prisma.research.findMany({
              where: {
                professorId:id
              },
          });
          return sendResponse(response, 200, 'success', research);
      } catch (error) {
          return sendResponse(response, 404, "error can't get researchs .", error);
      }
  }

    public static updateResearch = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const research = await prisma.research.update({
                where: {
                    id
                },
                data: request.body,
            });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 404, "error can't update research invalid id.", error);
        }
    }

    public static deleteResearch = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const research = await prisma.research.delete({
                where: {
                    id
                },
            });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 404, "error can't delete research invalid id.", error);
        }
    }

    // public static getResearchByMasterStudentId = async (
    //     request: Request,
    //     response: Response
    // ) => {
    //     try {
    //         const id = parseInt(request.params.id as string);
    //         const researches = await prisma.research.findMany({
    //             where: {
    //                 masterStudentId: id
    //             },
    //         });
    //         return sendResponse(response, 200, 'success', researches);
    //     } catch (error) {
    //         return sendResponse(response, 404, "error can't get researches invalid id.", error);
    //     }
    // }

    public static getResearchByTypeId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {type} = request.body 
            const researches = await prisma.research.findMany({
                where: {
                    type,
                },
            });
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches invalid id.", error);
        }
    }

    public static getResearchByDepartmentId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const researches = await prisma.research.findMany({
                where: {
                    departmentId: id
                },
            });
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches invalid id.", error);
        }
    }

    // public static getResearchsByAuthorId = async (
    //     request: Request,
    //     response: Response
    // ) => {
    //     try {
    //         const id = parseInt(request.params.id as string);
    //         const researches = await prisma.research.findMany({
    //             where: {
    //                 authorId: id
    //             },
    //         });
    //         return sendResponse(response, 200, 'success', researches);
    //     } catch (error) {
    //         return sendResponse(response, 404, "error can't get researches invalid id.", error);
    //     }
    // }

//     public static getResearchsBySupervisorId = async (
//         request: Request,
//         response: Response
//     ) => {
//         try {
//             const id = parseInt(request.params.id as string);
//             const researches = await prisma.research.findMany({
//                 where: {
//                     supervisorId:id
//                 },
//             });
//             return sendResponse(response, 200, 'success', researches);
//         } catch (error) {
//             return sendResponse(response, 404, "error can't get researches invalid id.", error);
//         }
//     }
}

export default ResearchController;
