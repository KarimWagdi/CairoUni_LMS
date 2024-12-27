import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helper/sendResponse";
const prisma = new PrismaClient();

class ProfessorAttachment {
  public static createProfessorAttachment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const {
        ssn,
        degreeDate,
        degreeUniversity,
        gender,
        degree,
        professorId,
      } = request.body;
      const ProfessorAttachment = await prisma.professor_attachment.create({
        data: {
          ssn,
          degreeDate,
          degreeUniversity,
          gender,
          degree,
          professorId,
        },
      });
      return sendResponse(response, 200, "success", ProfessorAttachment);
    } catch (err: unknown) {
      return sendResponse(
        response,
        404,
        "error can't create Professor's attachment.",
        err
      );
    }
  };

  public static getAllProfessorAttachment = async (
    request: Request,
    response: Response
  ) => {
    try {
      const professor_attachment = await prisma.professor_attachment.findMany();
      return sendResponse(response, 200, "success", professor_attachment);
    } catch (err: unknown) {
      return sendResponse(
        response,
        404,
        "error can't get Professor's Attachment.",
        err
      );
    }
  };

  public static getProfessorAttachmentById = async (
    request: Request,
    response: Response
  ) => {
    const id = parseInt(request.params.id as string);

    try {
      const professor_attachment = await prisma.professor_attachment.findUnique(
        {
          where: {
            id,
          },
        }
      );
      return sendResponse(response, 200, "success", professor_attachment);
    } catch (err: unknown) {
      return sendResponse(
        response,
        404,
        "error can't get Professor's Attachment invalid id.",
        err
      );
    }
  };

  public static updateProfessorAttachment = async (request: Request, response: Response) => {
    try {
      const {
        ssn,
        degreeDate,
        degreeUniversity,
        gender,
        degree,
      } = request.body;
      const id = parseInt(request.params.id as string);

      const professor_attachment = await prisma.professor_attachment.update({
        data: {
          ssn,
          degreeDate,
          degreeUniversity,
          gender,
          degree,
        },
        where: {
          id,
        },
      });
      return sendResponse(response, 200, "success", professor_attachment);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't update Professor's Attachment.", err);
    }
  };

  public static deleteProfessorAttachment = async (request: Request, response: Response) => {
    try {
      const id = parseInt(request.params.id as string);
      const professor_attachment = await prisma.professor_attachment.delete({
        where: {
          id,
        },
      });
      return sendResponse(response, 200, "success", professor_attachment);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't delete Professor's Attachment.", err);
    }
  };
}

export default ProfessorAttachment;
