import { NextFunction, Response, Request } from "express";
import { RequestWithUser } from "./auth";

const permit = (...roles: string[]) => {
  return (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWithUser;

    if (!req.user) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: "Permission denied" });
    }

    next();
  };
};

export default permit;
