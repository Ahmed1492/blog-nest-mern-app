import React, { useEffect, useState } from "react";
import Summary from "../../components/admin/Summary";
import LatestBlogs from "../../components/admin/LatestBlogs";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const Dashboard = () => {
  const { backEndUrl, token } = useAppContext();
  const [blogs, setBlogs] = useState([]);
  const fetchDashboard = async () => {
    try {
      let myResposne = await axios.get(
        `${backEndUrl}/api/admin/dashboard-data`,
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      console.log(myResposne.data);
      if (myResposne.data.success) {
        setBlogs(myResposne.data.dashboardData);
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
      await fetchDashboard();
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
      await fetchDashboard();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="w-full">
      <Summary blogs={blogs} />
      <LatestBlogs
        blogs={blogs}
        toggleBlog={toggleBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  );
};

export default Dashboard;
