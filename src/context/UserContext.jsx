import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(name, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/login`,
        { name, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        toast.success(data.message || "Login successful");
        navigate("/");
        if (fetchMyCourse) await fetchMyCourse();
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsAuth(false);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setBtnLoading(false);
    }
  }

  async function registerUser(name, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/register`,
        { name, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsAuth(true);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setIsAuth(false);
        return;
      }

      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (data.user) {
        setUser(data.user);
        setIsAuth(true);
      } else {
        throw new Error("No user data received");
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      setIsAuth(false);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        fetchUser,
      }}
    >
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
