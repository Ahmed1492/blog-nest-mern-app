import React, { useEffect, useState } from "react";
import { assets, comments_data } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

const BlogComments = ({ backEndUrl, id }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const getDaysAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  const fetchComment = async () => {
    try {
      let myResponse = await axios.post(
        `${backEndUrl}/api/comment/blog-comments`,
        { blog: id },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResponse.data);
      if (myResponse.data.success) {
        setComments(myResponse.data.comments);
      } else {
        toast.error(myResponse.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (name === "" || comment === "") {
      return toast.error("All feilds Required");
    }
    try {
      let myResponse = await axios.post(
        `${backEndUrl}/api/comment/add`,
        {
          name,
          content: comment,
          blog: id,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResponse.data);
      if (myResponse.data.success) {
        toast.success(myResponse.data.message);
        setName("");
        setComment("");
      } else {
        toast.error(myResponse.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [id]);

  return (
    <>
      {/* All Comments */}
      <h2 className="text-xl font-semibold self-start my-6">
        Comments ({comments.length})
      </h2>
      {comments.map((comment) => (
        <div className="" key={comment._id}>
          <div className="w-full bg-gray-100  px-7 py-3 rounded-lg my-4">
            <div className="flex items-center gap-2 w-full text-gray-900 font-medium">
              <img className="w-6" src={assets.user_icon} alt="user_icone" />
              <span>{comment.name}</span>
            </div>
            <div className="flex items-center justify-between mt-4 text-gray-600">
              <span>{comment.content}</span>
              <span>{getDaysAgo(comment.updatedAt)}</span>
            </div>
          </div>
        </div>
      ))}
      {/* Add Comments */}
      <form>
        <h3 className="font-semibold my-7">Add your comment</h3>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="px-2 py-2.5 min-w-2xl border border-gray-200 rounded-md outline-0"
          placeholder="Name"
          value={name}
        />
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="px-2 py-2.5 min-w-2xl border border-gray-200 rounded-md outline-0 mt-5"
          name=""
          placeholder="Comment"
          id=""
          value={comment}
          rows={10}
        ></textarea>
        <button
          onClick={addComment}
          className="bg-primary text-white px-6 py-2.5 rounded-md mt-4 cursor-pointer"
        >
          Submit
        </button>
      </form>

      {/* Social */}
      <h3 className="font-semibold mt-10 mb-5">
        Share this article on social media
      </h3>
      <div className="flex items-center gap-3">
        <img src={assets.facebook_icon} className="w-12" alt="facebook_icon" />
        <img src={assets.twitter_icon} className="w-12" alt="twitter_icon" />
        <img
          src={assets.googleplus_icon}
          className="w-12"
          alt="googleplus_icon"
        />
      </div>
    </>
  );
};

export default BlogComments;
