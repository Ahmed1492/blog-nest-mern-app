import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  let backEndUrl = import.meta.env.VITE_BACK_END_URL;

  const path = useLocation().pathname;

  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      let myResposne = await axios.get(`${backEndUrl}/api/blog/`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      // console.log(myResposne.data);
      if (myResposne.data.success) {
        setBlogs(myResposne.data.blogs);
      } else {
        toast.error(myResposne.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backEndUrl,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
  };

  let url = useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("blog-nest-token");
    if (token) {
      setToken(token);
    }
  }, [path]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
