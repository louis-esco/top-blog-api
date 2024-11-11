import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      const userData = jwtDecode(token);
      setUser(userData);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      user,
    }),
    [token, user]
  );

  // Waiting for effect to run before rendering children that use token to make API calls
  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthProvider;
