import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  validateTitle,
  validateCategory,
  validateContent,
  validateCreator,
  validateImagePath,
} from "../Validations/blogValidations";

function editBlog(props) {
  //const [isModalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [creator, setCreator] = useState("");
  const [imagePath, setImagePath] = useState(null);

  //fetch blog data
  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/api/blog/${id}`
        ); //calling server
        if (response && response.data) {
          // check serevr response
          setTitle(response.data.title); //set title state with response title
          setCategory(response.data.Category); //set category state with response cat
          setContent(response.data.content); //set content state with response content
          setCreator(response.data.creator); //set creator with res creator
          setImagePath(response.data.imagePath); //set image with res imagepath
          //toast.success("Fetched blog successfully");
        } else {
          console.log(response.error); // server response error
          toast.error("Failed to fetch blog. Please try again later."); //toast msg
        }
      } catch (error) {
        // server error
        console.error("Error fetching blog:", error);
        toast.error("Error fetching blog. Please try again later."); //toast msg
      }
    };

    fetchBlogsData(); // calling function to fetch
  }, [id]);

  //update blogs
  const handleSubmit = async (event) => {
    event.preventDefault();

    //add validations for const variable
    const titleValidation = validateTitle(title);
    const CategoryValidation = validateCategory(Category);
    const contentValidation = validateContent(content);
    const creatorValidation = validateCreator(creator);
    //const imagePathValidation = validateImagePath(imagePath);

    // check validations
    if (
      titleValidation ||
      CategoryValidation ||
      contentValidation ||
      creatorValidation 
    
    ) {
      toast.error(
        titleValidation ||
          CategoryValidation ||
          contentValidation ||
          creatorValidation 
       
      );
      return;
    }

    //add formData method
    const formData = new FormData();
    formData.append("title", title); // add title to form dta
    formData.append("Category", Category); // add category to form dta
    formData.append("content", content); //add content to form dta
    formData.append("creator", creator); //add creator to form dta
    formData.append("imagePath", imagePath); //add image to form dta
    try {
      const response = await axios.put(
        `http://localhost:3030/api/blog/${id}`,
        formData
      ); // calling server
      if (response && response.data) {
        // check response
        toast.success("blog updated successfully"); // toast success when data post
        window.location.href = "/dashboard"; // navigate to dash
      } else {
        // response error
        console.log(response.error); //console display error
      }
    } catch (error) {
      //server error
      console.error("Error fetching blogs:", error);
    }
  };

  //delete blog method
  const deleteBlog = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/api/blog/${id}`
      ); // calling server
      if (response && response.data) {
        //check response
        toast.success("blog deleted successfully"); // toast msg
        window.location.href = "/dashboard"; // naviagte dash
      } else {
        console.log(response.error); // response error
      }
    } catch (error) {
      console.error("Error fetching blogs:", error); // server error
    }
  };

  //delete blog method prompt
  const handleDelete = (blog) => {
    if (window.confirm("Are you sure to delete blog?")) {
      deleteBlog(blog);
    }
  };

  return (
    <div className=" flex items-center justify-center py-6 bg-Back bg-cover min-h-screen">
      <div className=" p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white/70 rounded-3xl shadow  dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className=" text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Edit Your Blog
            </h3>
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
                  id="name"
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
                  placeholder=" brand"
                  required=""
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
                  required=""
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
                    onChange={(e) => setImagePath(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-primary-800"
            >
              updated and save
            </button>
            <button
              type="submit"
              onClick={handleDelete}
              className="text-white float-right  items-center bg-red-600  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-primary-800"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default editBlog;
