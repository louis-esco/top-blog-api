import { Router } from "express";
import * as postsController from "../controllers/postsController.js";
import * as commentsController from "../controllers/commentsController.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.use(authController.verifyJwt);

router.get("/", postsController.getPosts);
router.post("/", postsController.postCreatePost);
router.put("/:postId", postsController.putUpdatePost);
router.delete("/:postId", postsController.deletePost);

router.get("/:postId/comments", commentsController.getComments);
router.post("/:postId/comments", commentsController.postCreateComment);
router.put("/:postId/comments/:commentId", commentsController.putUpdateComment);
router.delete("/:postId/comments/:commentId", commentsController.deleteComment);

export default router;
