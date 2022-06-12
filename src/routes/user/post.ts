import { Response, Request } from "express";

module.exports = (req: Request, res: Response) => {
  res.status(501).send("Not imlemented.");
};
