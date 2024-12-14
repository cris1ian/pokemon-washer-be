import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";


export class AuthUtils {
  private static secretKey: Secret = process.env.SECRET_KEY || "";

  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      jwt.verify(bearerToken, this.secretKey, (err: any, authData: any) => {
        console.log();
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
}
