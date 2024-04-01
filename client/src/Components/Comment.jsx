// Comment.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  validateText,
  ValidateName,
} from "../Validations/CommonFormValidations";

function Comment(props) {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [userData, setUserData] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [isUserAllowedToReply, setIsUserAllowedToReply] = useState(false);

  const fetchList = async () => {
    try {
      const res = await axios.get(
        `https://blog-backend-kbvp.onrender.com/api/blog/${id}`
      );
      setBlogs(res.data);
      // get authenticated user data
      const authUserData = getAuthenticatedUserData();
      setUserData(authUserData);

      // Check if the authenticated as creator
      if (authUserData.username === res.data.creator) {
        setIsUserAllowedToReply(true);
      } else {
        setIsUserAllowedToReply(false);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation code
    const textError = validateText(text);
    const authorError = ValidateName(author);

    if (textError || authorError) {
      return toast.error(textError || authorError);
    }

    const data = { author, text };

    try {
      const response = await axios.post(
        `https://blog-backend-kbvp.onrender.com/api/blog/${id}/comment`,
        data
      );

      if (response && response.data) {
        toast.success("Comment Added Successfully");
        setAuthor("");
        setText("");
        // Handle modal close without page reload if needed
      }
    } catch (err) {
      console.error("Comment failed:", err);
      toast.error("Comment Failed. Please check your credentials.");
    }
  };
  useEffect(() => {
    //fetch data calling function
    fetchList();
  }, [id]);

  // get the user data from local storage
  const Auth = localStorage.getItem("user");
  let authorName;
  if (Auth) {
    authorName = JSON.parse(Auth);
  }

  useEffect(() => {
    setAuthor(authorName?.username || "");
  }, [authorName]);

  // Close the modal
  const handleClose = () => {
    // Call the onClose prop from Dashboard to close the modal
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative p-4 w-full max-w-2xl md:h-auto">
        <div className="relative p-4 bg-white/70 rounded-3xl shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Add Comment
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={author}
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Username"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Comment
                </label>
                <textarea
                  id="description"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Add your comment here...."
                ></textarea>
              </div>
            </div>
            {/** user condition checking and render task */}
            {userData.username === blogs.creator ? (
              <div>
                <p className="text-red-500">
                  You cannot add a comment to your own blog.
                </p>
                {/* Optionally, you can choose to hide the "Add Comment" button here */}
              </div>
            ) : (
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Add Comment
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comment;
