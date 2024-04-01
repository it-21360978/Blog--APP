import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const fetchBlogsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://blog-backend-kbvp.onrender.com/api/");
      if (response && response.data) {
        setBlogs(response.data);
        console.log(response.data);
      } else {
        setError("Error fetching blogs. Please try again.");
        console.error(response.error);
      }
    } catch (error) {
      setError("Error fetching blogs. Please try again.");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-900">
        <section className="text-gray-600 body-font overflow-hidden ml-auto">
          <div className="container px-5 py-24 mx-auto">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Our Blog
              </h2>
              <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                We use an agile approach to test assumptions and connect with
                the needs of your audience early and often.
              </p>
            </div>
            <div className="flex flex-wrap -m-12">
              {blogs.slice(0, 4).map((blog) => (
                <div
                  key={blog._id}
                  className="p-12 md:w-1/2 flex flex-col items-start "
                >
                  <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                    {blog.Category}
                  </span>
                  <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4 dark:text-gray-300">
                    {blog.title}
                  </h2>
                  <p className="leading-relaxed mb-8 dark:text-gray-400">
                    {blog.content.split(" ").slice(0, 10).join(" ")}
                    {blog.content.split(" ").length > 10 && "..."}
                  </p>
                  <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                    <button className="text-indigo-500 inline-flex items-center">
                      View More
                      <FaArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      {/*   <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg> */}
                      <FaRegEye className="w-4 h-4 mr-1" />
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      {/*    <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg> */}
                      <FaRegComment className="w-4 h-4 mr-1" />
                      {blog.comments.length}
                    </span>
                  </div>
                  <a className="inline-flex items-center">
                    <img
                      alt="blog"
                      src="https://dummyimage.com/104x104"
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900 dark:text-yellow-50">
                        {blog.creator}
                      </span>
                      <span className="text-gray-400 text-xs tracking-widest mt-0.5 dark:text-green-50">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BlogSection;
