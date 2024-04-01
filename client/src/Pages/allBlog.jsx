import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function allBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]); // blog array state
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state
  const [searchCategory, setSearchCategory] = useState(""); // search state
  const [errorDisplayed, setErrorDisplayed] = useState(false); //error msg state

  // Fetching data from the server
  useEffect(() => {
    fetchBlogsData(); // calling the functions
  }, []);

  // Fetching data from the server
  const fetchBlogsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3030/api/");
      if (response && response.data) {
        //checking serever response
        setBlogs(response.data); // set the blog array with response
        // console.log(response.data);
      } else {
        // serevr response error
        setError("Error fetching blogs. Please try again."); // set state with error
        console.error(response.error); // console error
      }
    } catch (error) {
      // error server
      setError("Error fetching blogs. Please try again."); // set state with error
      console.error("Error fetching blogs:", error); // error msg console
    } finally {
      setLoading(false); //loading state stop
    }
  };

  
// Checking user logged in or not
const user = JSON.parse(localStorage.getItem("user"));




  // checking user logged in or not
  const Auth = localStorage.getItem("user");
  if (!Auth) {
    if (!errorDisplayed) {
      // if not loged in user , show error
      toast.error("You cannot access that without logging in! Sorry");
      setErrorDisplayed(true); // error state
    }
    navigate("/"); // navigate to home
  } else {
    if (!errorDisplayed) {
      // show success when user loged in
      toast.success("You are allowed to access blogs");
      setErrorDisplayed(true);
    }
    navigate("/allBlog"); // navigate to all blog page
  }

  // search method
  const filteredBlogs = blogs.filter((blog) => {
    if (searchCategory) {
      return blog.Category.toLowerCase().includes(searchCategory.toLowerCase());
    } else {
      return true;
    }
  });

  // search input handler
  const handleSearchCategory = (e) => {
    setSearchCategory(e.target.value);
  };

  

  return (
    <div>
      <div className="bg-white dark:bg-gray-900 py-20 lg:py-28">
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

          {/**search method  */}
          <div className=" flex items-center justify-center mb-10">
            <form className="flex items-center py-5 pl-5">
              <label for="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-96 hidden lg:block">
                <input
                  type="text"
                  value={searchCategory}
                  onChange={handleSearchCategory}
                  name="text"
                  id="voice-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Category"
                />

                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-3"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                Search
              </button>
            </form>
          </div>

          {Auth ? (
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex flex-col overflow-hidden rounded-lg border bg-white"
                >
                  <div className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                    <img
                      src={`${blog.imagePath}?sp=r&st=2023-12-30T09:07:02Z&se=2023-12-30T17:07:02Z&sv=2022-11-02&sr=c&sig=9G5ekQrzk6YNaxOgXYb9c0HHnSZ6qeAWpjgRreLScXI%3D`}
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
          ) : (
            <div className="text-red-500">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default allBlog;
