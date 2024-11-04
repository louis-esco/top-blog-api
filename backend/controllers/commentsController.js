import * as db from "../db/queries.js";

export const postCreateComment = async (req, res, next) => {
  try {
    const comment = {
      content: req.body.content,
      authorId: Number(req.body.authorId),
      postId: Number(req.params.postId),
    };
    const createdComment = await db.createComment(comment);
    res.json(createdComment);
  } catch (error) {
    console.error("There was an error creating comment", error);
    next(error);
  }
};

export const putUpdateComment = async (req, res, next) => {
  try {
    const comment = {
      id: Number(req.params.commentId),
      content: req.body.content,
      authorId: Number(req.body.authorId),
      postId: Number(req.params.postId),
    };
    const updatedComment = await db.updateComment(comment);
    res.json(updatedComment);
  } catch (error) {
    console.error("There was an error updating comment", error);
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await db.deleteComment(Number(req.params.commentId));
    res.json(deletedComment);
  } catch (error) {
    console.error("There was an error deleting comment", error);
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await db.getComments(Number(req.params.postId));
    res.json(comments);
  } catch (error) {
    console.error("There was an error getting comments", error);
    next(error);
  }
};
