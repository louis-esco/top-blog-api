import * as db from "../db/queries.js";

export const postCreatePost = async (req, res, next) => {
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published === "true",
      authorId: Number(req.body.authorId),
    };
    const createdPost = await db.createPost(post);
    res.json(createdPost);
  } catch (error) {
    console.error("There was an error creating post", error);
    next(error);
  }
};

export const putUpdatePost = async (req, res, next) => {
  try {
    const post = {
      id: Number(req.params.postId),
      title: req.body.title,
      content: req.body.content,
      published: req.body.published === "true",
      authorId: Number(req.body.authorId),
    };
    const updatedPost = await db.updatePost(post);
    res.json(updatedPost);
  } catch (error) {
    console.error("There was an error updating post", error);
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await db.deletePost(Number(req.params.postId));
    res.json(deletedPost);
  } catch (error) {
    console.error("There was an error deleting post", error);
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await db.getPosts();
    res.json(posts);
  } catch (error) {
    console.error("There was an error getting posts", error);
    next(error);
  }
};
