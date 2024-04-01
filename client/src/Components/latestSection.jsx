import React, { useEffect, useState } from "react";
import axios from "axios";

function LatestSection() {
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
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Explore the whole collection of open-source web components and
              elements built with the utility classNamees from Tailwind
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {blogs.slice(0, 4).map((blog) => (
              <div
                key={blog._id}
                className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className=" w-64 h-48 rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src={`https://blog-backend-kbvp.onrender.com/uploads/blogs/${encodeURIComponent(
                      blog.imagePath
                    )}`}
                    alt={blog.imagePath}
                  />
                </a>
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">
                    {blog.creator}
                  </span>
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400 break-words">
                    {blog.content.split(" ").slice(0, 8).join(" ")}{" "}
                    {/* Take the first 8 words */}
                    {blog.content.split(" ").length > 8 && "..."}
                  </p>
                  <ul className="flex space-x-4 sm:mt-0"></ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LatestSection;
