import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Comment from "./Comment";

function eachBlog() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blog data on component mount
  const fetchList = async () => {
    const res = await axios.get(`http://localhost:3030/api/blog/${id}`); // server calling
    setBlogs(res.data); //set state with response
    setSelectedBlog(res.data); //set selected state with response
  };
  useEffect(() => {
    //fetch data calling function
    fetchList();
  }, [id]);

  // get the user data from local storage
  const Auth = localStorage.getItem("user");

  // comment component visible method
  const openCommentModel = () => {
    setSelectedBlog(blogs);
    setShowComment(true);
  };

  // Checking user logged in or not
const user = JSON.parse(localStorage.getItem("user"));

// Get user image
const imageUrl = user ? `http://localhost:3030/uploads/user/${encodeURIComponent(user.imagePath)}` : '';


  return (
    <div className=" bg-Back bg-cover">
      <section className=" pt-20">
        <div className="mx-auto max-w-screen">
          <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
            {blogs.title}{" "}
          </h2>
          <p className="mb-8 font-light text-gray-800 lg:mb-16 sm:text-xl dark:text-gray-400 text-center ">
            {" "}
            {blogs.Category}
          </p>
        </div>
        <div className=" flex items-center justify-center">
          <img
            className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
            src={`${blogs.imagePath}?sp=r&st=2023-12-30T09:07:02Z&se=2023-12-30T17:07:02Z&sv=2022-11-02&sr=c&sig=9G5ekQrzk6YNaxOgXYb9c0HHnSZ6qeAWpjgRreLScXI%3D`}
            alt="step"
          />
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <div className="max-w-screen-md mx-auto">
            <blockquote>
              <p className="text-2xl font-medium text-gray-900 dark:text-white">
                {blogs.content}
              </p>
            </blockquote>
            <p className="flex items-center justify-center mt-6 space-x-3">
              {/* <img
                className="w-6 h-6 rounded-full"
                // src={imageUrl}
                alt="profile picture"
              /> */}
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  {blogs.creator}
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  {new Date(blogs.createdAt).toLocaleDateString()}
                </div>
              </div>
            </p>
          </div>
        </div>
      </section>
      <div className=" flex flex-row items-center justify-center">
        <button
          type="button"
          onClick={openCommentModel}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Feedback
        </button>

        <Link to={`/${blogs._id}/viewComments`}>
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            View Comments
          </button>
        </Link>
      </div>
      {/**comment model checking and render */}
      {showComment && <Comment id={id} onClose={() => setShowComment(false)} />}
    </div>
  );
}

export default eachBlog;
