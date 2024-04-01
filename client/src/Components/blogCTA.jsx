import React, { useEffect, useState } from "react";
import axios from "axios";

function BlogCTA() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const fetchBlogsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3030/api/");
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
      <section className=" bg-slate-100 dark:bg-gradient-to-r from-slate-500 to-slate-800">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-4xl font-bold title-font mb-4 dark:text-yellow-100 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
              Trending Now: Unlock the Latest Buzz
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-slate-700 dark:text-slate-200 mt-2">
              Discover the hottest topics captivating our community right now.
              Dive into the pulse of the moment with our Trending Now section,
              where we curate the most talked-about and engaging posts.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {blogs.slice(0, 6).map((blog) => (
              <div
                key={blog._id}
                className="  w-64 h-64 mx-auto lg:w-96 p-4 rounded-xl"
              >
                <div className="flex relative">
                  <img
                    alt="gallery"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src={`http://localhost:3030/uploads/blogs/${encodeURIComponent(
                      blog.imagePath
                    )}`}
                  />
                  <div className="px-8 py-10 relative z-10 w-full bg-white backdrop-blur-3xl opacity-0 hover:opacity-100">
                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                      {blog.title}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {" "}
                      {blog.content.split(" ").slice(0, 10).join(" ")}
                      {blog.content.split(" ").length > 10 && "..."}
                    </h1>
                    <p className="leading-relaxed text-gray-600 text-sm">
                      {blog.creator}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogCTA;
