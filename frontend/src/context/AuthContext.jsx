import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [loading, setLoading] =
    useState(true);

  // LOAD USER
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

    setLoading(false);

  }, []);

  // LOGIN
  const login = async (
    email,
    password
  ) => {

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:5000/api/auth/login",
          {
            email,
            password,
          }
        );

      const data = response.data;

      if (data.success) {

        setUser(data.user);

        setToken(data.token);

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        return {
          success: true,
        };
      }

      return {
        success: false,
        message: data.message,
      };

    } catch (error) {

      return {
        success: false,
        message: "Login failed",
      };
    }
  };

  // REGISTER
  const register = async (
    name,
    email,
    password
  ) => {

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:5000/api/auth/register",
          {
            name,
            email,
            password,
          }
        );

      return response.data;

    } catch (error) {

      return {
        success: false,
        message: "Registration failed",
      };
    }
  };

  // LOGOUT
  const logout = () => {

    setUser(null);

    setToken("");

    localStorage.removeItem("token");

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(AuthContext);
}