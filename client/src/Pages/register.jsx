import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {validateEmail,
  validatePassword,
  ValidateUser,
 ImageValidation} from '../Validations/CommonFormValidations'

function register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [imagePath, setImagePath] = useState(null);

  //Image input change method 
  const imageHandler = (e) => {
    setImagePath(e.target.files[0]);
  };

  //method for form data post
  const submitFORM = async (e) => {
    e.preventDefault();

    //add validations for const variable
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const usernameError = ValidateUser(username);
    const imagePathError = ImageValidation(imagePath);

    //checking login form input fields and display msg
    if (emailError || passwordError || usernameError || imagePathError ) {
      toast.error(
        emailError || passwordError || usernameError || imagePathError
      )
      return;
    }

    // form data passing
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("imagePath", imagePath);

    try {
      const data = await axios.post(
        "https://blog-backend-kbvp.onrender.com/api/signup",     // calling server function 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",  // passing the data as a form 
          },
        }
      );

      //console.log(data);
      toast.success("Register Successful");// showing success toast msg
      setEmail(""); //set email state empty
      setPassword(""); // set pw state empty
      setUsername(""); // set user name empty 
      setImagePath(""); // set image path empty

      e.target.reset();// all target fields are reset

      navigate("/login");// after login navigate login 

    } catch (error) {// error checking
      console.error("Register failed:", error);// display console error 
      toast.error("Register Failed. Please check your credentials.");// error toast display
    }
  };

  return (
    <>
      <div className=" bg-regBack1 bg-cover">
        <section className=" overflow-hidden flex items-center justify-center w-full min-h-screen ">
          <div className="flex min- overflow-hidden">
            <div className="flex flex-col justify-center flex-1 px-4 py-20 overflow-hidden sm:px-6 lg:flex-none lg:px-20 xl:px-24 border rounded-3xl bg-white/10 ">
              <div className="w-full max-w-xl mx-auto lg:w-96 ">
                <div>
                  <div className="text-blue-800 text-2xl text-center">
                    WriteWave
                  </div>
                  <h2 className="mt-3 text-3xl font-extrabold text-gray-800 dark:text-gray-200 text-center">
                    Create Your Account
                  </h2>
                </div>

                <div className="mt-8">
                  <div className="mt-6">
                    <form onSubmit={submitFORM} className="space-y-6">
                      {/**image input method */}
                      <div className="flex items-center justify-center">
                        <label
                          for="dropzone-file"
                          className="flex flex-col items-center justify-center w-28 h-28 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center p-1">
                            <p className="text-xxs text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click</span> or drag
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={imageHandler}
                          />
                        </label>
                      </div>

                      <div>
                        <label
                          for="name"
                          className="block text-sm font-medium text-gray-800 dark:text-gray-500"
                        >
                         
                          User Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="name"
                            autocomplete="name"
                            required=""
                            placeholder="Your userName"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          for="email"
                          className="block text-sm font-medium text-gray-800 dark:text-gray-500"
                        >
                         
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            autocomplete="email"
                            required=""
                            placeholder="Your Email"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          for="password"
                          className="block text-sm font-medium text-gray-800 dark:text-gray-500"
                        >
                         
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            autocomplete="current-password"
                            required=""
                            placeholder="Your Password"
                            className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-10 py-4 text-lg font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 text-neutral-600 bg-white rounded-full">
                          
                          Already have an account
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link to="/login">
                     {/** sign in option */}
                        <button className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition hover:bg-white duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                          <div className="flex items-center justify-center">
                            <span className="ml-4">Sign-in</span>
                          </div>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default register;
