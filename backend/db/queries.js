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
    console.error("There was an error creating user in db", error);
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
