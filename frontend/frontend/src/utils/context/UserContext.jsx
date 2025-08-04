import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("authToken");
    return token
      ? { token, isAuthenticated: true }
      : { token: null, isAuthenticated: false };
  });

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setUser({ token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
