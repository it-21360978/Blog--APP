import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TOGGLE from "../Components/themeToggle";
import LOGO from "../assets/logo.png";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ADDbLOG from "../Components/addBlog";
import { useNavigate } from "react-router-dom";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { toast } from "react-hot-toast";


export default function Dashboard() {
  const { id } = useParams(); //id parameter
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [userData, setUserData] = useState(null);
  const [filterBlogs, setFilterBlogs] = useState([]); // filter method state

 


  useEffect(() => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      // Parse the stored data back to an object
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData); // set state and stored
    }
  }, []);

  const [text] = useTypewriter({
    /* Hook Config */
    words: [' Welcome to WriteWave '],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 1000,
  })

  // blog get method
  const fetchBlogsData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/"); // server calling method
      if (response && response.data) {
        // checking response
        setBlogs(response.data); // set state with response data
        //console.log(response.data);
      } else {
        console.log(response.error); // server response error
      }
    } catch (error) {
      console.error("Error fetching blogs:", error); // error msg
    }
  };

  useEffect(() => {
    // calling the fetchblogs method
    fetchBlogsData();
  }, []);

  // get specific blog method
  const fetchList = async () => {
    const res = await axios.get(`http://localhost:3030/api/blog/${id}`); // server calling
    setBlogs(res.data); // set state with response
  };
  useEffect(() => {
    // calling upper function to get response
    fetchList();
  }, [id]);

  // blog delete method
  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/api/blog/${blogId}`
      ); // calling server
      if (response && response.data) {
        // checking response
        toast.success("blog deleted successfully"); // toast success msg

        fetchBlogsData(); // calling the upper method to refresh
      } else {
        console.log(response.error); // serevr response error
      }
    } catch (error) {
      console.error("Error deleting blog:", error); // server error
    }
  };

  //blog method confirmation prompt
  const handleDelete = (blog) => {
    if (window.confirm("Are you sure to delete blog?")) {
      deleteBlog(blog._id); // Pass the correct blog id
    }
  };

  // logout method
  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Clear user data from state
    setUserData(null);
    // Redirect to home
    navigate("/");
  };

  // sidebar toggle method
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // modal toggle method
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // add blog toggle method
  const toggleAddBlog = () => {
    setShowAddBlog(!showAddBlog);
  };

  // filter method for username only
  // const filterBlogsByUser = (blog) => {
  //   console.log('userData:', userData);
  //   console.log('blog.creator:', blog.creator);
  //   return userData && userData.username === blog.creator;
  // };

  // filter method for  category
  // const filteredBlogs = blogs.filter((blog) => {
  //   if (searchCategory) {
  //     return blog.Category.toLowerCase().includes(searchCategory.toLowerCase());
  //   } else {
  //     return true;
  //   }
  // });

  // filter method for category and username
  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatches =
      !searchCategory ||
      blog.Category.toLowerCase().includes(searchCategory.toLowerCase()); // checking letter case
    const userMatches = userData && userData.username === blog.creator; // check user and blog creator to show relavant blog

    return categoryMatches && userMatches;
  });

  // search category method change
  const handleSearchCategory = (e) => {
    setSearchCategory(e.target.value);
  };

  //const filteredBlogs = blogs.filter(filterBlogsByUser);


  // Checking user logged in or not
const user = JSON.parse(localStorage.getItem("user")) || {};
const imageName = user?.imagePath?.split('/').pop() ?? '';


// Get user image
//extract the file name from path
const imageUrl = imageName && `http://localhost:3030/uploads/user/${encodeURIComponent(imageName)}`;



  return (
    <div>
      <div className=" bg-Back bg-cover overflow-hidden bg-repeat sm:bg-contain md:bg-cover lg:bg-contain xl:bg-cover">
        {/* Sidebar */}
        <aside
          id="default-sidebar"
          className={`fixed left-0 mt-0 w-auto md:w-64 h-full transition-transform z-10 ${
            isSidebarOpen
              ? "-translate-x-full sm:translate-x-0 md:translate-x-0"
              : "translate-x-0"
          }`}
        >
          <div className="h-full px-3 bg-gradient-to-r from-blue-800 to-indigo-900 dark:bg-gray-800">
            <button className=" bg-white/20 px-3 py-1 rounded-full dark:text-black">
              {" "}
              <TOGGLE />
            </button>

            <ul className="space-y-2 font-medium py-4">
              <img
                src={LOGO}
                alt="logo"
                className=" flex items-center justify-center w-48 mb-12"
              />
              <Link to="/">
                <li>
                  <div className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group">
                    <svg
                      className="w-[20px] h-[20px] "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span className="ml-3 text-lg">Home</span>
                  </div>
                </li>
              </Link>
              <Link to="/contact">
                <li>
                  <div className=" py-4 flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group">
                    <svg
                      className="w-[20px] h-[20px]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                    </svg>

                    <span className="flex-1 ml-3 text-lg">Contact</span>
                  </div>
                </li>
              </Link>
              <Link to="/about">
                <li>
                  <div className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group">
                    <svg
                      className="w-[20px] h-[20px]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z" />
                    </svg>

                    <span className="flex-1 ml-3 text-lg">About</span>
                  </div>
                </li>
              </Link>
              {userData ? 
              <Link to={`/${userData._id}/editUser`}>
                <li>
                  <div className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-900 dark:hover:bg-gray-700 group">
                    <svg
                      className="w-[20px] h-[20px] "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 19"
                    >
                      <path d="M7.324 9.917A2.479 2.479 0 0 1 7.99 7.7l.71-.71a2.484 2.484 0 0 1 2.222-.688 4.538 4.538 0 1 0-3.6 3.615h.002ZM7.99 18.3a2.5 2.5 0 0 1-.6-2.564A2.5 2.5 0 0 1 6 13.5v-1c.005-.544.19-1.072.526-1.5H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h7.687l-.697-.7ZM19.5 12h-1.12a4.441 4.441 0 0 0-.579-1.387l.8-.795a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-.795.8A4.443 4.443 0 0 0 15 8.62V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.12c-.492.113-.96.309-1.387.579l-.795-.795a.5.5 0 0 0-.707 0l-.707.707a.5.5 0 0 0 0 .707l.8.8c-.272.424-.47.891-.584 1.382H8.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1.12c.113.492.309.96.579 1.387l-.795.795a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0l.8-.8c.424.272.892.47 1.382.584v1.12a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.12c.492-.113.96-.309 1.387-.579l.795.8a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707l-.8-.795c.273-.427.47-.898.584-1.392h1.12a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM14 15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                    </svg>

                    <span className="flex-1 ml-3 text-lg">Settings</span>
                  </div>
                </li>
              </Link>:null}
              {userData ? (
                <div className=" py-10 border bg bg-white rounded-3xl">
                  <img
                    className=" w-10 h-10 rounded-full mx-auto"
                    src={imageUrl}
                    alt="image"
                  />
                  <div className="mt-2 text-center text-2xl font-bold">
                    {userData.username}
                  </div>
                  <div className=" mt-2 text-center font-mono">
                    {userData.email}{" "}
                  </div>
                  <button onClick={handleLogout} className=" mt-2 mx-20 ">
                    <span className="flex items-center p-2 text-white bg bg-red-600 rounded-lg hover:bg-red-800 dark:hover:bg-red-700 group">
                      Logout
                    </span>
                  </button>
                </div>
              ) : null}
            </ul>
          </div>
        </aside>

        {/* Toggle button under h2 header */}
        <button
          className="md:hidden p-2 text-black float-right bg-white rounded-full"
          onClick={handleSidebarToggle}
        >
          {isSidebarOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
        </button>

        {/* Content */}
        <div className=" fixed top-0 ">
          <div>
            <div className="flex items-center"></div>
          </div>
        </div>

        <div className="p-4 sm:ml-64">
          <div>
            <div className="flex items-center justify-between mx-4 my-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent  dark:text-white uppercase text-center">
              {text}<Cursor />
              </h2>
            </div>

            {/**Chart card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 md:ml-16 lg:ml-96">
              <div className="flex flex-col lg:flex-row items-center justify-center rounded-full gap-5">
                <iframe
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                  }}
                  width="300"
                  height="208"
                  src="https://charts.mongodb.com/charts-blog-site-gdfdo/embed/charts?id=658aabb2-51ea-40ba-848b-80f62802171a&maxDataAge=-1&theme=light&autoRefresh=false"
                ></iframe>
                <iframe
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                  }}
                  width="300"
                  height="208"
                  src="https://charts.mongodb.com/charts-blog-site-gdfdo/embed/charts?id=658aaad5-0a2d-4bbc-878c-296c176ec207&maxDataAge=-1&theme=light&autoRefresh=false"
                ></iframe>
                <iframe
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                  }}
                  width="300"
                  height="208"
                  src="https://charts.mongodb.com/charts-blog-site-gdfdo/embed/charts?id=658aab5d-58ca-427b-87fa-a3523e9938fc&maxDataAge=3600&theme=light&autoRefresh=true"
                ></iframe>
              </div>
            </div>

            {/**Search filter */}

            <form className="flex items-center py-5 pl-5">
              <label for="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-96">
                <input
                  type="text"
                  value={searchCategory}
                  onChange={handleSearchCategory}
                  name="text"
                  id="voice-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Category"
                  required
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

            {/** add blog button */}
            <div className="flex pl-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={toggleAddBlog}
              >
                Add Blog
              </button>
            </div>

            {/* Add Blog form */}
            {showAddBlog && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <ADDbLOG onClose={toggleAddBlog} />
              </div>
            )}

            {/**Add Blog form */}

            <div>
              {/* blog card  */}

              <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="grid gap-8 lg:grid-cols-2">
                  {filteredBlogs.map((blog) => (
                    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                          <BiSolidCategory className=" mr-2" />
                          {blog.Category}
                        </span>
                        <span className="text-sm">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {blog.title}{" "}
                      </h2>
                      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                        {blog.content.split(" ").slice(0, 10).join(" ")}
                        {blog.content.split(" ").length > 10 && "..."}{" "}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium dark:text-white">
                            {blog.creator}
                          </span>
                        </div>
                        <div className=" flex flex-row gap-6">
                          <Link to={`/each/${blog._id}`}>
                            <button>
                              <FaEye className=" text-2xl text-gray-500" />
                            </button>
                          </Link>
                          <button onClick={() => handleDelete(blog)}>
                            <AiFillDelete className=" text-red-600 text-2xl" />
                          </button>
                          {/* Pass blog._id to toggleEditBlog function using an inline arrow function */}
                          <Link to={`/edit/${blog._id}`}>
                            {" "}
                            <button>
                              <FaEdit className="text-2xl dark:text-white" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
