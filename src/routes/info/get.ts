import { Response, Request } from "express";

import { getServiceDetail, updateUseCount } from "../../db/index";

module.exports = async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId || "";
  const ans = await getServiceDetail(serviceId);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.json(ans);
  await updateUseCount(serviceId);
};
