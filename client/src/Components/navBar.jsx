import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import logo from "../assets/logo.png";
import Theme from "./themeToggle";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [isNavVisible, setNavVisibility] = useState(false);

  const Auth = localStorage.getItem("user");

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  // Define your navigation links here
  const topLinks = [
    { text: "Home", href: "/" },
    { text: "Contact-Us", href: "/contact" },
    { text: "About", href: "/about" },
    { text: "Privacy-Policy", href: "/privacy" },
  ];

  return (
    <div className=" fixed top-0 w-full z-10 ">
      <header className="text-gray-600 body-font bg-white border shadow-2xl rounded-xl dark:bg-gradient-to-r from-blue-800 to-indigo-900">
        <div className="container mx-auto flex p-3 flex-col lg:flex-row items-start">
          <div className="flex flex-row gap-10">
            <div className="flex p-0 title-font font-medium md:items-center text-gray-900  md:mb-0">
              <Link to="/">
                {" "}
                <img src={logo} alt="logo" className="w-full h-10" />
              </Link>
            </div>
            <button onClick={toggleNav} className="lg:hidden block">
              {isNavVisible ? (
                <IoClose className="text-3xl font-bold dark:text-white mt-1" />
              ) : (
                <GiHamburgerMenu className="text-3xl font-bold dark:text-white mt-1" />
              )}
            </button>
            <div className="flex flex-row items-end lg:hidden">
              <Theme />
            </div>
          </div>

          <nav
            className={`${
              isNavVisible ? "block" : "hidden"
            } lg:ml-auto lg:mr-auto lg:flex lg:flex-wrap items-center text-base justify-center transition-all duration-500 ease-in`}
          >
            <ul>
              {topLinks.map((link, index) => (
                <li key={index} className="block lg:inline-block my-2 lg:my-2">
                  <a
                    href={link.href}
                    className="mr-5 hover:text-blue-950 hover:underline dark:text-yellow-50 dark:hover:underline"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
              {Auth ? (
                <>
                  <button
                    onClick={logout}
                    type="button"
                    className="lg:hidden text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl mt-1 text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
                  >
                    Logout
                  </button>
                  <Link to="/dashboard">
                    <button
                      type="button"
                      className="lg:hidden mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                      Dashboard
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <button
                    type="button"
                    className="lg:hidden mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    Sign-in
                  </button>
                </Link>
              )}
            </ul>
          </nav>

          <div className="ml-auto hidden lg:block">
            {Auth ? (
              <>
                <button
                  onClick={logout}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-xl mt-1 text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
                >
                  Logout
                </button>
                <Link to="/dashboard">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl mt-1 text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    Dashboard
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl mt-1 text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  Sign-in
                </button>
              </Link>
            )}
          </div>

          <div className="ml-6 hidden lg:block">
            <Theme />
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
