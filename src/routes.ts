import { Router } from 'express';
import { authenticateUserController } from './controllers/authenticateControllers';
import { CreateMessageController } from './controllers/CreateMessageController';
import { get3LastMessagesController } from './controllers/get3LastMessagesController';
import { profileUserController } from './controllers/profileUserController';
import { ensureAuthenticate } from './middleware/ensureAuthenticate';

const router = Router();

router.post("/authenticate", new authenticateUserController().handle);

router.post("/messeges", ensureAuthenticate, new CreateMessageController().handle);

router.get("/profile", new profileUserController().handle)

router.get("/messages/last3", ensureAuthenticate, new get3LastMessagesController().handle)

export { router };