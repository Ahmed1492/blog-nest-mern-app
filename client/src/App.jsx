import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import Dashboard from "./pages/admin/Dashboard";
import Layout from "./pages/admin/Layout";
import AddBlog from "./pages/admin/AddBlog";
import Comments from "./pages/admin/Comments";
import ListBlogs from "./pages/admin/ListBlogs";
import Login from "./components/admin/Login";
import ScrollToTop from "./components/ScrollToTop";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { token } = useAppContext();

  return (
    <>
      <Toaster />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={!token ? <Login /> : <Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="list-blog" element={<ListBlogs />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
