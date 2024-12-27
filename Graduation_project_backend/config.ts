import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  jwt: {
    authPrivateKey: process.env.AUTH_PRIVATE_KEY,
    pepper: process.env.JWT_PEPPER,
    salt: process.env.SALT,
  },
  senderEmail: {
    email: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
  }
};