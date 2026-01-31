import React, { useEffect, useState } from "react";
import CommentsTable from "../../components/admin/CommentsTable";
import { comments_data } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";

const Comments = () => {
  const { backEndUrl, token } = useAppContext();
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      let myResposne = await axios.get(
        `${backEndUrl}/api/comment/comments-admin`,
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      console.log(myResposne.data);
      if (myResposne.data.success) {
        setComments(myResposne.data.comments);
      } else {
        toast.error(myResposne.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const approveComment = async (id) => {
    try {
      let myResposne = await axios.post(
        `${backEndUrl}/api/comment/approve-comment`,
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
      await fetchComments();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async (id) => {
    try {
      let myResponse = await axios.post(
        `${backEndUrl}/api/comment/delete/${id}`,
        {}, // empty body
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      console.log(myResponse.data);

      if (myResponse.data.success) {
        toast.success(myResponse.data.message);
      } else {
        toast.error(myResponse.data.message);
      }

      await fetchComments();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="w-full mt-10 pb-10">
      <div className="flex items-center justify-between w-[95%]   lg:w-[88%]  xl:w-[70%] gap-2.5 mt-7 mb-4 text-left px-3">
        <span className="font-medium">Comments</span>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border border-full px-4 py-1.5 cursor-pointer text-xs rounded-full ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border border-full px-4 py-1.5 cursor-pointer text-xs rounded-full ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <CommentsTable
        comments={comments}
        approveComment={approveComment}
        deleteComment={deleteComment}
        filter={filter}
      />
    </div>
  );
};

export default Comments;
