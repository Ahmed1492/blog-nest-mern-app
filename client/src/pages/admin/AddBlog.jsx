import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { parse } from "marked";
const AddBlog = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("startup");
  const [isPublished, setIsPublished] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const { backEndUrl, token } = useAppContext();
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const addBlog = async () => {
    try {
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);
      let myResponse = await axios.post(
        `${backEndUrl}/api/blog/create-blog`,
        formData,
        {
          headers: {
            Authorization: token,

            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResponse.data);
      if (myResponse.data.success) {
        setTitle("");
        setImage(false);
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("Startup");
        toast.success(myResponse.data.message);
      } else {
        toast.error(myResponse.data.err);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await addBlog();
  };

  const generateContent = async () => {
    if (!title) return toast.error("please enter a title first");
    try {
      setLoading(true);
      let myResponse = await axios.post(
        `${backEndUrl}/api/blog/generate`,
        {
          prompt: title,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      if (myResponse.data.success) {
        quillRef.current.root.innerHTML = parse(myResponse.data.content);
      } else {
        let errorMessage = myResponse.data.err;
        try {
          const parsed = JSON.parse(myResponse.data.err);
          if (parsed.error && parsed.error.message) {
            errorMessage = parsed.error.message;
          }
        } catch (e) {
          // Keep original if parse fails
        }

        toast.error(errorMessage);
      }
      console.log(myResponse.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("title ", title);
  //   console.log("subTitle ", subTitle);
  // }, [title, subTitle]);

  useEffect(() => {
    // intitiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="w-full pb-8">
      <div className="bg-white min-h-[80vh] w-[70%] shadow  px-5 py-6 rounded-md">
        <div>
          <span className=" text-gray-600 ">Upload thumbnail</span>
          <label htmlFor="upload-image">
            <img
              className="w-28 mt-2 cursor-pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload icon"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="upload-image"
            className="hidden"
          />
        </div>
        {/* INPUTS */}
        <form onSubmit={onSubmitHandler} className="mt-6 flex flex-col gap-1">
          <label className="text-gray-600" htmlFor="">
            Blog Title
          </label>
          <input
            type="text"
            className="w-108 px-2 py-1.5 outline-0 border border-gray-300 rounded-md"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name=""
            id=""
          />
          <label className="mt-2 text-gray-600" htmlFor="">
            Sub title
          </label>
          <input
            type="text"
            className="w-108 px-2 py-1.5 outline-0 border border-gray-300 rounded-md"
            placeholder="Type here"
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
            name=""
            id=""
          />

          <p className="mt-4 text-gray-600">Blog Description</p>
          <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
            <div ref={editorRef}></div>
            {loading && (
              <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/10 mt-2 -mb-1 ">
                <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
              </div>
            )}
            <button
              disabled={loading}
              className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
              onClick={generateContent}
              type="button"
            >
              {loading ? "Loading..." : "Generate with AI"}
            </button>
          </div>

          <label className="mt-2 text-gray-600" htmlFor="">
            Sub Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            type="text"
            className="w-40 text-gray-400 px-2 py-1.5 outline-0 border border-gray-300 rounded-md"
            placeholder="Type here"
          >
            <option value="">Select Category</option>
            {blogCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 mt-3">
            <label className=" text-gray-600" htmlFor="">
              Publish now
            </label>
            <input
              className="scale-125 cursor-pointer"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              value={isPublished}
              type="checkbox"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white rounded-md py-1.5 px-10 w-40 font-light mt-7 cursor-pointer"
          >
            {isAdding ? "Adding.." : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
