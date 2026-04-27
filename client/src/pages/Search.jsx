import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const { blogs } = useAppContext();
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.category.toLowerCase().includes(query.toLowerCase()) ||
          blog.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs([]);
    }
  }, [query, blogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Search <span className="gradient-text">Articles</span>
            </h1>
            <p className="text-gray-500 text-base">
              Find the perfect article from our collection
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-card hover:shadow-card-hover focus-within:border-primary/40 focus-within:shadow-glow transition-all duration-300 flex items-center p-1.5 gap-2"
          >
            <svg className="w-5 h-5 text-gray-400 ml-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent py-2"
              type="text"
              placeholder="Search by title, category, or content..."
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 active:scale-95 py-2.5 px-6 rounded-xl text-white text-sm font-semibold transition-all duration-200 shadow-sm shadow-primary/30 shrink-0"
            >
              Search
            </button>
          </motion.form>

          {/* Search Info */}
          {query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-500">
                {filteredBlogs.length > 0 ? (
                  <>
                    Found <span className="font-semibold text-gray-700">{filteredBlogs.length}</span> result{filteredBlogs.length !== 1 ? 's' : ''} for{' '}
                    <span className="font-semibold text-primary">"{query}"</span>
                  </>
                ) : (
                  <>
                    No results found for <span className="font-semibold text-gray-700">"{query}"</span>
                  </>
                )}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!query ? (
              <motion.div
                key="no-query"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Search</h3>
                <p className="text-gray-400 mb-6">Enter keywords to find articles</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Browse all articles
                </Link>
              </motion.div>
            ) : filteredBlogs.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Results Found</h3>
                <p className="text-gray-400 mb-6">Try different keywords or browse all articles</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchInput("");
                      setSearchParams({});
                    }}
                    className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    Clear search
                  </button>
                  <Link
                    to="/"
                    className="text-sm px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors"
                  >
                    Browse all articles
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Search;
