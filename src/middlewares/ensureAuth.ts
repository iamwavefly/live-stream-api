import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function name(req: any, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const rawToken = authorization.split(" ");
  try {
    jwt.verify(rawToken[1], process.env.jwtSecret, (error, data) => {
      if (error) {
        return res.status(400).json({
          status: "fail",
          status_code: 102,
          message: "Invalid token",
        });
      }
      req.user = data.user;
      return next();
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        status: "fail",
        status_code: 102,
        message: "Invalid token",
      });
    }
  }
}
