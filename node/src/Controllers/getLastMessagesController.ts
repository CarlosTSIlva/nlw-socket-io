import { Request, Response } from "express";
import { io } from "../app";
import { getLastMessagesService } from "../services/getLastMessagesService";
class getLastMessagesController {
  async handle(req: Request, res: Response) {
    try {
      const service = new getLastMessagesService();
      const result = await service.execute();
      return res.json(result);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export { getLastMessagesController };
