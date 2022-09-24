import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

// =================================================================

const AuthProvider = (props) => {
  const history = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  // =================================================================

  const saveToken = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  // =================================================================

  const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.clear();
    history("/login");
  };

  // =================================================================

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      saveToken(token);
    }
    if (isLoggedIn) {
      history("/");
    }
  }, [token, isLoggedIn]);

  // =================================================================

  const state = {
    token,
    isLoggedIn,
    logout,
    saveToken,
    setIsLoggedIn,
  };
  // =================================================================

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
