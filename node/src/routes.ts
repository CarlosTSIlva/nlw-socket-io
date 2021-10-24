import { Router } from "express";
import { AuthenticatedUserController } from "./Controllers/AuthenticatedUserController";
import { CreateMessageController } from "./Controllers/CreateMessageService";
import { getLastMessagesController } from "./Controllers/getLastMessagesController";
import { ProfileUserController } from "./Controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticatedUserController().handle);

router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handle
);

router.get("/messages/last/3", new getLastMessagesController().handle);

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
