import axios from "axios";

const url = "http://localhost:3000/";

export const postLogin = async (formObject) => {
  return await axios.post(url + "users/auth", {
    ...formObject,
  });
};

export const getPosts = async () => {
  return await axios.get(url + "posts");
};

export const postComment = async (comment) => {
  return await axios.post(
    url + "posts/" + comment.postId.toString() + "/comments",
    {
      content: comment.content,
      authorId: comment.authorId,
    }
  );
};
