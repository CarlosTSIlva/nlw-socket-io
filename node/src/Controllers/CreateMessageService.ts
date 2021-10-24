import { Request, Response } from "express";
import { io } from "../app";
import { CreateMessageService } from "../services/CreateMessageService";
class CreateMessageController {
  async handle(req: Request, res: Response) {
    try {
      const { message } = req.body;

      const service = new CreateMessageService();
      const result = await service.execute(message, req.user_id);

      return res.json(result);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export { CreateMessageController };
