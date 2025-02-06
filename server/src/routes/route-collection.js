import { Router } from "express";
import me from "../controllers/me.js";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import validateJwtMiddleware from "../middleware/validateJwtMiddleware.js";

const router = Router();

router.post("/v1/login", login);
router.post("/v1/register", register);
router.post("/v1/me", validateJwtMiddleware, me);

export default router;
