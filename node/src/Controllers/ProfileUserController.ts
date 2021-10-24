import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ProfileUserService();
      const result = await service.execute(req.user_id);
      return res.json(result);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

export { ProfileUserController };
