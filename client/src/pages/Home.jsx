import React from "react";
import Hero from "../components/Hero";
import BlogList from "../components/BlogList";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Home = () => {
  const features = [
    {
      icon: "🚀",
      title: "Latest Tech Trends",
      description: "Stay ahead with cutting-edge technology insights and innovations."
    },
    {
      icon: "💼",
      title: "Startup Stories",
      description: "Learn from successful entrepreneurs and startup journeys."
    },
    {
      icon: "💰",
      title: "Financial Wisdom",
      description: "Master your finances with expert advice and strategies."
    },
    {
      icon: "🌟",
      title: "Lifestyle Tips",
      description: "Enhance your daily life with practical lifestyle guidance."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tech Entrepreneur",
      content: "BlogNest has become my go-to source for staying updated with the latest in tech and business. The quality of content is exceptional!",
      initials: "SJ",
      color: "from-blue-500 to-indigo-500",
      stars: 5,
    },
    {
      name: "Mike Chen",
      role: "Software Developer",
      content: "The programming and technology articles here have helped me advance my career significantly. Highly recommended for any developer!",
      initials: "MC",
      color: "from-primary to-violet-500",
      stars: 5,
    },
    {
      name: "Emily Davis",
      role: "Financial Advisor",
      content: "The financial insights and tips shared on BlogNest are practical and easy to implement. A great resource for anyone managing their finances.",
      initials: "ED",
      color: "from-pink-500 to-rose-500",
      stars: 5,
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary">BlogNest</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes our platform the perfect destination for curious minds seeking quality content.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BlogList />

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-divider" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="gradient-text">Readers</span> Say
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">
              Join thousands of satisfied readers who trust BlogNest for quality content and insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col gap-4"
              >
                {/* Quote icon */}
                <svg className="w-8 h-8 text-primary/15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.stars }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
