import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../helper/sendResponse';
import bcrypt from 'bcrypt';
import NodeMailer from 'nodemailer'
import { config } from '../../config';
const prisma = new PrismaClient();

class ResetPassword {
    public static SendResetToken = async (
        request: Request,
        response: Response
    ) => {
        try {
            const email = request.body.email;
            const user = await prisma.professor.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return sendResponse(response, 404, 'error user not found');
            }
            const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
            await prisma.professor.update({
                where: {
                    email: email,
                },
                data: {
                    resetToken: resetToken,
                    resetTokenExpiry: new Date().getTime() + 3600000,
                },
            });
            
            var transport = NodeMailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                  user: config.senderEmail.email,
                  pass: config.senderEmail.password
                }
            });
            const message = {
                from: 'Scholer Sync',
                to: email,
                subject: 'Reset Password',
                text: `Your reset token is ${resetToken}`,
            };
            transport.sendMail(message, (err, info) => {
                if (err) {
                    return sendResponse(response, 404, 'error can\'t send reset token', err);
                }
            });
            return sendResponse(response, 200, 'success');
        } catch (error) {
            return sendResponse(response, 404, 'error can\'t send reset token', error);
        }
    }

    public static ValidateResetToken = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { email, resetToken } = request.body;
            const user = await prisma.professor.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return sendResponse(response, 404, 'error user not found');
            }
            if (user.resetToken === resetToken && user.resetTokenExpiry && user.resetTokenExpiry > new Date().getTime()) {
                return sendResponse(response, 200, 'success');
            }
            return sendResponse(response, 404, 'error invalid token');
        } catch (error) {
            return sendResponse(response, 404, 'error invalid token', error);
        }
    }

    public static ResetPassword = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { email, password } = request.body;
            const user = await prisma.professor.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return sendResponse(response, 404, 'error user not found');
            }
            const hashedPassword = await bcrypt.hash(
                `${password}${config.jwt.pepper}`,
                parseInt(config.jwt.salt as string)
            );
            await prisma.professor.update({
                where: {
                    email: email,
                },
                data: {
                    password: hashedPassword,
                },
            });
            return sendResponse(response, 200, 'success');
        } catch (error) {
            return sendResponse(response, 404, 'error can\'t reset password', error);
        }
    }
}

export default ResetPassword;