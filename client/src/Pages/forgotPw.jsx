import React, { useState } from "react";
import RESET from "../assets/reset.jpg";
import axios from "axios";
import { toast } from "react-hot-toast";
import { validateEmail } from "../Validations/CommonFormValidations";

function forgotPw() {
  const [email, setEmail] = useState("");// email stored state


  // form handler method
  const forgotHandler = async (req, re) => {
    req.preventDefault();

    // pass the validation to const variable 
    const emailValidation = validateEmail(email);

    //checking  form input fields and display msg
    if (emailValidation) {
      toast.error(emailValidation);
      return;
    }

    // add email object to data variable
    const data = { email };
    try {
      const response = await axios.post(
        "https://blog-backend-kbvp.onrender.com/api/user/forgot",  // calling server function
        data
      );

      if (response && response.data) { // checking response of server
        toast.success("Reset link sent to your email"); // if response 200 , then toast success
        window.location.href = "/login";// this is another method to navigate , this method is loading webbrowser 
      } else {
        console.log(response.error);// if server response error
      }
    } catch (error) {
      console.error("Error fetching ", error); // server error
      toast.error("Error fetching! Please try again later.");
    }
  };

  return (
    <div>
      <section className="bg-regBack bg-cover min-h-screen">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
              <div className="w-full px-6 py-3">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <div className="inline-flex items-center w-full">
                      <h3 className="text-lg font-bold text-neutral-600 l reading-6 lg:text-5xl">
                        forgotten Password?
                      </h3>
                    </div>
                    <div className="mt-4 text-base text-gray-500">
                      <p>Add your Email to reset</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={forgotHandler} method="post">
                  <div className="mt-6 space-y-2">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex flex-col mt-4 lg:space-y-2">
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full px-10 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-3"
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="order-first hidden w-full lg:block">
                <img
                  className="object-cover h-full bg-cover rounded-l-lg"
                  src={RESET}
                  alt="side"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default forgotPw;
