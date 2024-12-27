import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"; // Import Request and Response from Express
import { sendResponse } from "../helper/sendResponse";

const prisma = new PrismaClient();
class ProjectController {
  // Create a new project
  public static async createProject(
    request: Request,
    response: Response
  ) {
    try {
      const {projectName, description, topic, startDate, endDate, status, createdBy, affiliate, type, ProfessorRole, departmentId} = request.body;
      const professorId = parseInt(request.body.decoded.user.id as string);
      if(type !== "Master" && type !== "GraduationProject" && type !== "ProfessorResearch" && type !== "ProfessorProject") return sendResponse(response, 404, "error can't create Project.type must be one of these types: Master, GraduationProject, ProfessorResearch, ProfessorProject");
      if(ProfessorRole !== "author" && ProfessorRole !== "supervisor") return sendResponse(response, 404, "error can't create Project.ProfessorRole must be one of these types: author, supervisor");
      const newProject = await prisma.project.create({ data: {projectName, description, topic, startDate, endDate, status, createdBy, affiliate, type, ProfessorRole, departmentId, professorId} });
      return sendResponse(response, 200, "success", newProject);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't create Project.", err);
    }
  }

  // Get a single project by ID
  public static async getProjectById(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const projectId = parseInt(request.params.id);
      const project = await prisma.project.findUnique({
        where: { projectId },
      });
      if (!project) {
        return response.status(404).json({ message: "Project not found" });
      }
      return sendResponse(response, 200, "success", project);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't get Project.", err);
    }
  }

  public static async getAllProjects(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const projects = await prisma.project.findMany();
      return sendResponse(response, 200, "success", projects);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't get Projects.", err);
    }
  }
  public static getProjectsByAuthorIdOrSupervisorId = async (
    request: Request,
    response: Response
) => {
    try {
      const id = parseInt(request.params.id as string);
        const projects = await prisma.project.findMany({
            where: {
              professorId:id
            },
        });
        return sendResponse(response, 200, 'success', projects);
    } catch (error) {
        return sendResponse(response, 404, "error can't get researchs .", error);
    }
}

  // Update a project by ID
  public static async updateProject(request: Request, response: Response): Promise<Response> {
    try {
      const projectId = parseInt(request.params.projectId); // Assuming projectId is a route parameter
      const data = request.body; // Assuming updated data is in the request body
      const updatedProject = await prisma.project.update({
        where: { projectId },
        data,
      });
      return sendResponse(response, 200, "success", updatedProject);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't update Project.", err);
    }
  }

  public static async deleteProject(request: Request, response: Response): Promise<Response> {
    try {
      const projectId = parseInt(request.params.id);
      await prisma.project.delete({ where: { projectId } });
      return sendResponse(response, 200, "success", projectId);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't delet Project.", err);
    }
  }
}

export default ProjectController;
