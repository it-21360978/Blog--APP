import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  validateTitle,
  validateCategory,
  validateContent,
  validateCreator,
  validateImagePath,
} from "../Validations/blogValidations";

function AddBlog(props) {
  // const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState("");
  const [imagePath, setImagePath] = useState(null);
  const [userData, setUserData] = useState(null);

  //image input handle
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImagePath(file); // set state with inputed file
  };

  // submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const titleError = validateTitle(title);
    const CategoryError = validateCategory(Category);
    const contentError = validateContent(content);
    const creatorError = validateCreator(creator);
    const imagePathError = validateImagePath(imagePath);

    // check validations and toast error
    if (
      !titleError &&
      !CategoryError &&
      !contentError &&
      !creatorError &&
      !imagePathError
    ) {
      console.log("Form is valid!");
    } else {
      toast.error(
        titleError ||
          CategoryError ||
          contentError ||
          creatorError ||
          imagePathError
      );
      return;
    }

    // Create a new form data object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imagePath", imagePath);
    formData.append("creator", creator);
    formData.append("Category", Category);

    try {
      const res = await axios.post("http://localhost:3030/api/", formData, {
        //server calling
        headers: {
          "Content-Type": "multipart/form-data", // multiple data content
        },
      });
      // console.log("Server Response:", res.data);
      toast.success("Your blog added successfully"); // toast response msg

      setTitle(""); // set title state empty
      setContent(""); // set content empty
      setCreator(""); //set Creator empty
      setCategory(""); //set category empty
      setImagePath(null); //set file empty
      e.target.reset(); // all fields reset
    } catch (err) {
      //serever response error
      console.error("Error uploading blog:", err); //console error
      toast.error("Error uploading blog , Please check details"); //toast error
      if (err.response) {
        console.log("Server Error Response:", err.response.data);
        toast.error("Something went wrong!");
      }
    }
  };

  // Close the modal
  const handleClose = () => {
    // Call the onClose prop from Dashboard to close the modal
    if (props.onClose) {
      props.onClose();
    }
  };

  //checking user logged in or not
  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      // Parse the stored data back to an object
      const parsedUserData = JSON.parse(storedUserData); // pass the string data to json
      setUserData(parsedUserData); // set userdata state with user details
      setCreator(parsedUserData.username); // set creator state with username
    }
  }, []);

  return (
    <div>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white/70 rounded-3xl shadow  dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className=" text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Add Blog
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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type the title"
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <input
                  type="text"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="technical"
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Creator
                </label>
                <input
                  type="text"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Username"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Content
                </label>
                <textarea
                  id="description"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Write article here"
                ></textarea>
              </div>

              <div className="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG{" "}
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    onChange={handleImageChange}
                    className=""
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
            >
              Add new Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
