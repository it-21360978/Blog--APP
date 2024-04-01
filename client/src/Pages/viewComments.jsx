import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import REPLY from "../Components/Reply";

function ViewComments() {
  const { id } = useParams(); // get the blog id as a parameter
  const [comments, setComments] = useState([]); // comment array state
  const [blogs, setBlogs] = useState([]); // blog array state , this state get all responses to the array
  const [isReplyModalOpen, setReplyModalOpen] = useState(false); // reply model handle
  const [selectedComment, setSelectedComment] = useState(null); // selection comment
  const [isUserAllowedToReply, setIsUserAllowedToReply] = useState(false); // checking user and creator state

  const fetchList = async () => {
    try {
      const res = await axios.get(`https://blog-backend-kbvp.onrender.com/api/blog/${id}`); // calling the server function
      setBlogs(res.data); // server response data set to the blog array
      setSelectedBlog(res.data); // server response set to the selected blog array

      // Check if the authenticated user is the creator
      const authUser = localStorage.getItem("user");
      if (authUser === res.data.creator) {
        setIsUserAllowedToReply(true); // this mean user and creator is same
      } else {
        setIsUserAllowedToReply(false); // not same user and creator set the reply state false
      }
    } catch (error) {
      console.error("Error fetching blog:", error); // if blog not fetched show error
    }
  };

  useEffect(() => {
    // use effect hook use get data
    fetchList(); // upper function calling
  }, [id]);

  const Auth = localStorage.getItem("user"); // if user logged in , get details to Auth variable

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://blog-backend-kbvp.onrender.com/api/blog/${id}/comments`
      ); // server calling
      //console.log('API Response:', response);

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setComments(response.data); // pass the response to setComment state
        if (response.data.length === 0) {
          // if array data equal to 0 or empty
          toast.error("No comments yet...you can add a comment for this blog"); // show error toast
        } else {
          toast.success("Fetched comments successfully"); // show succes toast
        }
      } else {
        // console.error('Invalid response structure:', response.data);
        toast.error("Error fetching comments"); // server error msg
      }
    } catch (error) {
      //console.error('Error fetching comments:', error);
      //console.error('Response data:', error.response?.data);
      toast.error("Error fetching comments");
    }
  };

  useEffect(() => {
    // this hook use for comment function
    fetchComments(); // calling the function
  }, [id]);

  //reply model handle method
  const openReplyModal = (comment) => {
    // Check if the authenticated user is allowed to reply
    if (isUserAllowedToReply) {
      setReplyModalOpen(true); // user and creator is equal then open
      setSelectedComment(comment); // relevant comment
    } else {
      // Display an error toast if user is not a creator
      toast.error("You are not allowed to reply to this blog");
    }
  };

  return (
    <div className=" bg-regBack bg-cover min-h-screen">
      <div className="relative overflow-x-auto sm:rounded-lg m-0 lg:m-16 py-20">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-10 py-3">
                User Name
              </th>
              <th scope="col" className="px-12 py-3">
                Comment
              </th>
              <th scope="col" className=" px-10 py-3">
                Action
              </th>
            </tr>
          </thead>
          {/** mapping the fetched data in to table data */}
          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {comment.author}
                </td>
                <td className="px-12 py-4">{comment.text}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => openReplyModal(comment)}
                    className="text-white bg-indigo-800 hover:bg-indigo-500 outline-black hover:shadow-lg hover:stroke-white font-medium rounded-full text-sm px-3 py-2.5 mr-1 mb-1"
                  >
                    Add Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/** checking user and render model */}
      {isReplyModalOpen && (
        <REPLY
          isOpen={isReplyModalOpen}
          onClose={() => setReplyModalOpen(false)}
          selectedComment={selectedComment}
        />
      )}
    </div>
  );
}

export default ViewComments;
