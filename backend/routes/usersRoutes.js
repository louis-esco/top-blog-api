import { Router } from "express";
import * as usersController from "../controllers/usersController.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.use(authController.verifyJwt);

router.get("/", usersController.test, usersController.getUsers);
router.post("/", usersController.postCreateUser);
router.put("/:userId", usersController.putUpdateUser);
router.delete("/:userId", usersController.deleteUser);

router.post("/auth", authController.userLogin, (req, res) => {
  res.json(req.user);
});

export default router;
