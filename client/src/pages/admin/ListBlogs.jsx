import React, { useEffect, useState } from "react";
import ListBlogTable from "../../components/admin/ListBlogTable";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { backEndUrl, token } = useAppContext();
  const fetchBlogs = async () => {
    try {
      let myResposne = await axios.get(`${backEndUrl}/api/blog/admin-blogs`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      console.log(myResposne.data);
      if (myResposne.data.success) {
        setBlogs(myResposne.data.blogs);
      } else {
        toast.error(myResposne.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleBlog = async (id) => {
    try {
      let myResposne = await axios.post(
        `${backEndUrl}/api/blog/toggle-publish`,
        {
          id,
        },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResposne.data);
      if (myResposne.data.success) {
        toast.success(myResposne.data.message);
      } else {
        toast.error(myResposne.data.message);
      }
      await fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      let myResposne = await axios.post(
        `${backEndUrl}/api/blog/delete-blog`,
        {
          id,
        },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResposne.data);
      if (myResposne.data.success) {
        toast.success(myResposne.data.message);
      } else {
        toast.error(myResposne.data.message);
      }
      await fetchBlogs();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="mt-10 w-full">
      <div className="flex items-center gap-2.5 my-7 text-left">
        <span className="font-medium">All Blogs</span>
      </div>
      <ListBlogTable
        toggleBlog={toggleBlog}
        deleteBlog={deleteBlog}
        blogs={blogs}
      />
    </div>
  );
};

export default ListBlogs;
