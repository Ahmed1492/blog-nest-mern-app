import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import BlogDetails from "../components/BlogDetails";
import BlogComments from "../components/BlogComments";
import { BlogDetailSkeleton } from "../components/Loader";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { backEndUrl } = useAppContext();

  const getBlogData = async () => {
    setError(false);
    setIsLoading(true);
    try {
      let myBlog = await axios.get(`${backEndUrl}/api/blog/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      
      if (myBlog.data.success) {
        setBlog(myBlog.data.blog);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error("Failed to load blog");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <BlogDetailSkeleton />
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">404 - Blog Not Found</h2>
            <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
            <a 
              href="/" 
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogDetails blog={blog} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BlogComments backEndUrl={backEndUrl} id={id} />
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
