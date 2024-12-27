import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helper/sendResponse";
import { request } from "http";
const prisma = new PrismaClient();

class UserSurvey {
    public static create = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const { surveyId } = request.body;
            const getSurvey = await prisma.userSurvey.findMany({
                where: {
                    AND: {
                        professorId: parseInt(id),
                        surveyId: parseInt(surveyId),
                    },
                },
            });
            if (getSurvey.length > 0) {
                return sendResponse(response, 400, "Survey already exists");
            }
            const userSurvey = await prisma.userSurvey.create({
                data: {
                    professorId: parseInt(id),
                    surveyId: parseInt(surveyId),
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 500, "error", err);
        }
    }

    public static getAll = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userSurvey = await prisma.userSurvey.findMany({
                where: {
                    professorId: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getById = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userSurvey = await prisma.userSurvey.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static update = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const { surveyId } = request.body;
            const userSurvey = await prisma.userSurvey.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    surveyId: parseInt(surveyId),
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static updateComplete = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const { complete } = request.body;
            const userSurvey = await prisma.userSurvey.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    complete: complete,
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static delete = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userSurvey = await prisma.userSurvey.delete({
                where: {
                    id: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getBySurveyId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userSurvey = await prisma.userSurvey.findMany({
                where: {
                    surveyId: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getByProfessorId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userSurvey = await prisma.userSurvey.findMany({
                where: {
                    professorId: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getProfessorSurvey = async (
        request: Request,
        response: Response
    ) => {
        try {
            const professorId = request.body.decoded.user.id;
            const userSurvey = await prisma.userSurvey.findMany({
                where: {
                    professorId:professorId
                },include: {
                    survey: true
                }
            });
            return sendResponse(response, 200, "success", userSurvey);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }
}

export default UserSurvey;