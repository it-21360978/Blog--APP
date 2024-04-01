import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  PasswordValidate,
} from "../Validations/CommonFormValidations";

function Login() {
    
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // method for form data post
  const submitHandler = async (e) => {
    e.preventDefault();

    //add validations for const variable
    const emailValidation = validateEmail(email);
    const passwordValidation = PasswordValidate(password);

    //checking login form input fields and display msg
    if (emailValidation || passwordValidation) {
      toast.error(emailValidation || passwordValidation);
      return;
    }

    // pass the email and password as a data object
    const data = { email, password };

    try {
      const res = await axios.post("https://blog-backend-kbvp.onrender.com/api/login", data); //calling the server and get response
      //console.log(res);
      const result = res.data; // store the response data to result const variable

      localStorage.setItem("user", JSON.stringify(result)); // set the localstorage file as a user
      toast.success("Login Successful"); // showing the success msg if user data is valid

      setEmail(""); //after data post set the email state is empty
      setPassword(""); // set the password is empty
      e.target.reset(); // all target inputs are reset

      navigate("/"); // after user login success user navigate automatically dash
    } catch (err) {
      // checking error
      console.error("Login failed:", err);
      toast.error("Login Failed. Please check your credentials."); // if data not valid the server side validations
      // Log the specific error details received from the server
      //console.error('Server error details:', err.response?.data || err.message);
    }
  };

  return (
    <div className=" bg-regBack bg-cover">
      <section className=" overflow-hidden flex items-center justify-center min-h-screen">
        <div className="flex min- overflow-hidden">
          <div className="flex flex-col justify-center flex-1 px-4 py-12 overflow-hidden sm:px-6 lg:flex-none lg:px-20 xl:px-24  border rounded-3xl bg-white/10 ">
            <div className="w-full max-w-xl mx-auto lg:w-96">
              <div>
                <div className="text-blue-800 text-2xl">WriteWave</div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-800 dark:text-gray-200">
                  Sign in.
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  {/** from data handling */}
                  <form onSubmit={submitHandler} className="space-y-6">
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
                        {" "}
                        Password{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          autocomplete="current-password"
                          required=""
                          placeholder="Your Password"
                          className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          placeholder="Your password"
                          className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label
                          for="remember-me"
                          className="block ml-2 text-sm text-gray-600"
                        >
                         
                          Remember me
                        </label>
                      </div>
                      {/** if user not remind their pw  */}
                      <div className="text-sm">
                        <Link to="/forgot">
                          
                          <div className="font-medium text-blue-600 hover:text-blue-500">
                           
                            Forgot your password?
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div>
                      {/** form data post button */}
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full px-10 py-4 text-lg font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-neutral-600 bg-white rounded-full">
                        
                        Don't have an account
                      </span>
                    </div>
                  </div>
                  <div>
                    {/** sign up form navigate */}
                    <Link to="/signup">
                      <button className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <div className="flex items-center justify-center">
                          <span className="ml-4 ">Sign-up</span>
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
  );
}

export default Login;
