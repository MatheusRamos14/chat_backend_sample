import { Router } from "express";

import { SessionController } from "../controllers/sessionController";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/login', sessionController.handleLogin);
sessionRouter.post('/signup', sessionController.handleSignUp);

export { sessionRouter }