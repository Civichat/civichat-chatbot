import { Response, Request } from "express";

module.exports = (req: Request, res: Response) => {
  Promise.all(req.body.events.map(require("./messageHandler"))).then((result) =>
    res.json(result)
  );
};
