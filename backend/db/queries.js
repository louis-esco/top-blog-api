import prisma from "../prisma/client.js";

export const createPost = async (post) => {
  try {
    const createdPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        authorId: post.authorId,
      },
    });
    return createdPost;
  } catch (error) {
    console.error("There was an error creating post in db", error);
    throw error;
  }
};

export const updatePost = async (post) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        authorId: post.authorId,
      },
    });
    return updatedPost;
  } catch (error) {
    console.error("There was an error updating post in db", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return deletedPost;
  } catch (error) {
    console.error("There was an error deleting post in db", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error("There was an error getting posts in db", error);
    throw error;
  }
};

export const createComment = async (comment) => {
  try {
    const createdComment = await prisma.comment.create({
      data: {
        content: comment.content,
        postId: comment.postId,
        authorId: comment.authorId,
      },
    });
    return createdComment;
  } catch (error) {
    console.error("There was an error creating comment in db", error);
    throw error;
  }
};

export const updateComment = async (comment) => {
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        content: comment.content,
        postId: comment.postId,
        authorId: comment.authorId,
      },
    });
    return updatedComment;
  } catch (error) {
    console.error("There was an error updating comment in db", error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    });
    return deletedComment;
  } catch (error) {
    console.error("There was an error deleting comment in db", error);
    throw error;
  }
};

export const getComments = async (postId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });
    return comments;
  } catch (error) {
    console.error("There was an error getting comment in db", error);
    throw error;
  }
};
