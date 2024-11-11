import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../utils/apiQueries";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null);

      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());

      const response = await postLogin(formObject);

      const token = response.data;
      setToken(token);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("There was an error logging in", error);
      if (error.status === 401) setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" />
        <button type="submit" disabled={loading}>
          Log in
        </button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

export default Login;
