import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { config } from '../../config';
import { sendResponse } from '../helper/sendResponse';

const prisma = new PrismaClient();
export class SearchController {
    
    public static search = async (req: Request, res: Response) => {
        try {
            const query = req.query.query as string;

            if (!query) {
                return sendResponse(res, 400, 'Query parameter is required.');
            }

            // Fetch corresponding professors from the database using Prisma
            const professors = await prisma.professor.findMany({
                where: {
                    fullName: {
                        contains: query
                    }
                },
                include: {
                    professorAttachment: true,
                    department: true
                }
            });

            // Filter out null results and remove password from the response
            const processedProfessors = professors
                .filter(professor => professor !== null)
                .map(professor => {
                    if (professor) {
                        const { password, ...professorWithoutPassword } = professor;
                        return professorWithoutPassword;
                    }
                    return null;
                });

            return sendResponse(res, 200, 'success', processedProfessors);
        } catch (error) {
            console.error('there was an error searching for user :', error);
            return sendResponse(res, 500, "Error during search", error);
        }
    }
}
