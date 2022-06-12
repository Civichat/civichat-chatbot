import { Response, Request } from "express";

import { getQueryResult } from "../../db/index";

module.exports = async (req: Request, res: Response) => {
  const resultId = req.query.resultId || "";
  const ans = await getQueryResult(resultId);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.json(ans);
};
