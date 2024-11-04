import { Router } from "express";
import * as usersController from "../controllers/usersController.js";

const router = Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.postCreateUser);
router.put("/:userId", usersController.putUpdateUser);
router.delete("/:userId", usersController.deleteUser);

export default router;
