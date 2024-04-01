import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function blog() {
  const [blogs, setBlogs] = useState([]); // blog array state
  const [loading, setLoading] = useState(false); //loading state
  const [error, setError] = useState(null); // error state

  //fetch blogs calling server
  useEffect(() => {
    fetchBlogsData(); //below function
  }, []);

  //fetch blogs function
  const fetchBlogsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3030/api/"); //calling server
      if (response && response.data) {
        // check serevr response
        setBlogs(response.data); // set blog state with response data
        //console.log(response.data);
      } else {
        setError("Error fetching blogs. Please try again."); // set state with response error
        console.error(response.error); // response error
      }
    } catch (error) {
      // server error
      setError("Error fetching blogs. Please try again."); // set error
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

 // Checking user logged in or not
const user = JSON.parse(localStorage.getItem("user"));




  return (
    <div data-aos="fade-up" data-aos-duration="3000">
      <div className="bg-white dark:bg-gray-900 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl dark:text-white">
              Our Blog
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {/** blog data mapping to 6 blogs only */}
            {blogs.slice(0, 6).map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col overflow-hidden rounded-lg border bg-white"
              >
                <div className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                  <img
                    src={`${blog.imagePath}?sp=r&st=2023-12-30T09:07:02Z&se=2023-12-30T17:07:02Z&sv=2022-11-02&sr=c&sig=9G5ekQrzk6YNaxOgXYb9c0HHnSZ6qeAWpjgRreLScXI%3D`}
                    loading="lazy"
                    alt={blog.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="mb-2 text-lg font-semibold text-gray-800">
                    <span className="rounded border px-2 py-1 text-sm text-gray-500">
                      {blog.Category}
                    </span>
                    <h1 className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">
                      {blog.title}
                    </h1>
                  </div>

                  <p className="mb-8 text-gray-500">
                    {blog.content.split(" ").slice(0, 10).join(" ")}
                    {blog.content.split(" ").length > 10 && "..."}
                  </p>

                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-center gap-2">
                     <div>
                        <span className="block text-indigo-500">
                          {blog.creator}
                        </span>
                        <span className="block text-sm text-gray-400">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link to={`/each/${blog._id}`}>
                      <button className="rounded border bg-blue-700 px-2 py-1 text-sm text-white hover:bg-blue-800">
                        Read more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Link to="/allBlog">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  View more
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default blog;
