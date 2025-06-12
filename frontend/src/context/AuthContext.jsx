import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // holds user data if available
  const [isAuthenticated, setIsAuthenticated] = useState(false); // boolean auth status
  const [loading, setLoading] = useState(true); // used to prevent flicker

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await api.get("/auth/verify"); // works via cookie/session
      setUser(res.data.user || null); // optional: depends on backend
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (form) => {
    try {
      const res = await api.post("/auth/register", form);
      setUser(res.data.user || null);
      setIsAuthenticated(true);
      return { success: true, status: 201 };
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  };

  const login = async (form) => {
    try {
      const res = await api.post("/auth/login", form);
      setUser(res.data.user || null);
      setIsAuthenticated(true);
      return { success: true, status: 200 };
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
      return { success: true, status: 200 };
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      throw error.response?.data || { message: "Logout failed" };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
// Custom hook to use auth
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};