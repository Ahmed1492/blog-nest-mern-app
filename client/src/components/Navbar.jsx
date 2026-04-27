import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { token, setToken } = useAppContext();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("blog-nest-token");
    setToken(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="text-xl font-extrabold text-gray-900 tracking-tight">
              Blog<span className="text-primary">Nest</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {!location.pathname.includes("admin") &&
              navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-primary bg-primary/8"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-3">
            {location.pathname.includes("admin") && token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 border border-red-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            ) : (
              <Link
                to="/admin"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {token ? "Dashboard" : "Get Started"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-4 space-y-1">
            {!location.pathname.includes("admin") &&
              navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-primary bg-primary/8"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

            <div className="pt-2 px-4">
              {location.pathname.includes("admin") && token ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-red-50 text-red-600 text-sm font-medium px-5 py-2.5 rounded-full border border-red-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full"
                >
                  {token ? "Dashboard" : "Get Started"}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;