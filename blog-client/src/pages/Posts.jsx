import { useEffect, useState } from "react";
import { getPosts, postComment } from "../utils/apiQueries";
import { useAuth } from "../provider/authProvider";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getPostsData = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("There was an error getting posts data", error);
      }
    };

    getPostsData();
  }, [user, posts]);

  const handleSubmit = async (e, postId) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());

      const comment = {
        content: formObject.content,
        authorId: user.id,
        postId: postId,
      };

      const response = await postComment(comment);
      const updatedPosts = [...posts];
      updatedPosts
        .find((el) => el.id === postId)
        .comments.push({
          ...response.data,
          author: { username: user.username, id: user.id },
        });

      setPosts(updatedPosts);
    } catch (error) {
      console.error("There was an error submitting comment", error);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="title">Title: {post.title}</div>
          <div className="content">Content: {post.content}</div>
          <div className="published">Created at: {post.createdAt}</div>
          <div className="author">Author: {post.author.username}</div>
          <div className="comments">
            Comments:
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                {comment.author.username}: {comment.content}
              </div>
            ))}
            <form onSubmit={(e) => handleSubmit(e, post.id)}>
              <input
                disabled={loading}
                type="text"
                name="content"
                id="content"
              />
              <button disabled={loading} type="submit">
                Submit comment
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
