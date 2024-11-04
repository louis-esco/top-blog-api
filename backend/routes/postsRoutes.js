import { Router } from "express";
import * as postsController from "../controllers/postsController.js";

const router = Router();

router.get("/", postsController.getPosts);
router.post("/", postsController.postCreatePost);
router.put("/:postId", postsController.putUpdatePost);
router.delete("/:postId", postsController.deletePost);

export default router;
