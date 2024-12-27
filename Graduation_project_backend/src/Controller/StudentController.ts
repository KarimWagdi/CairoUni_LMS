// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { sendResponse } from "../helper/sendResponse";
// const prisma = new PrismaClient();

// class Student {
//   public static createStudent = async (
//     request: Request,
//     response: Response
//   ) => {
//     try {
//       const { studentName, studentCode } = request.body;
//       const student = await prisma.student.create({
//         data: {
//           studentName,
//           studentCode,
//         },
//       });
//       return sendResponse(response, 200, "success", student);
//     } catch (err: unknown) {
//       return sendResponse(response, 404, "error can't create Student.", err);
//     }
//   };

//   public static getAllStudents = async (
//     request: Request,
//     response: Response
//   ) => {
//     try {
//       const students = await prisma.student.findMany();
//       return sendResponse(response, 200, "success", students);
//     } catch (err: unknown) {
//       return sendResponse(response, 404, "error can't get Students.", err);
//     }
//   };

//   public static getStudentById = async (
//     request: Request,
//     response: Response
//   ) => {
//     const studentId = parseInt(request.params.id as string);

//     try {
//       const student = await prisma.student.findUnique({
//         where: {
//           studentId,
//         },
//       });
//       return sendResponse(response, 200, "success", student);
//     } catch (err: unknown) {
//       return sendResponse(
//         response,
//         404,
//         "error can't get student invalid id.",
//         err
//       );
//     }
//   };

//   public static updateStudent = async (
//     request: Request,
//     response: Response
//   ) => {
//     try {
//       const { studentName, studentCode } = request.body;
//       const studentId = parseInt(request.params.id as string);

//       const student = await prisma.student.update({
//         data: {
//           studentName,
//           studentCode,
//         },
//         where: {
//           studentId,
//         },
//       });
//       return sendResponse(response, 200, "success", student);
//     } catch (err: unknown) {
//       return sendResponse(response, 404, "error can't update student.", err);
//     }
//   };

//   public static deleteStudent = async (
//     request: Request,
//     response: Response
//   ) => {
//     try {
//       const studentId = parseInt(request.params.id as string);
//       const student = await prisma.student.delete({
//         where: {
//           studentId,
//         },
//       });
//       return sendResponse(response, 200, "success", student);
//     } catch (err: unknown) {
//       return sendResponse(response, 404, "error can't delete student.", err);
//     }
//   };
// }

// export default Student;
