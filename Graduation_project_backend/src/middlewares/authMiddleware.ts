import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {config} from "../../config";

const tokenValidateMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authHeader = request.get("Authorization");
    if (authHeader) {
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (token && bearer === "Bearer") {
        try {
            const checkToken = jwt.verify(token, config.jwt.authPrivateKey as string, (err, decoded) => {
                if (err) {
                    return response.status(401)
                    const error: Error = new Error("unauthorized");
                    next(error);
                } else {
                    request.body.decoded = decoded;
                    next();
                }
            });
        } catch (error) {
            return false;
        }
      }
    } else {
      response.status(401);
      const error: Error = new Error("unauthorized");
      next(error);
    }
  } catch (error) {
    response.status(401);
    next(error);
  }
};

export default tokenValidateMiddleware;