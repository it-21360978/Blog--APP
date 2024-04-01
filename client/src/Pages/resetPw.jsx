import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import RESET from "../assets/reset.jpg";
import {validatePassword} from '../Validations/CommonFormValidations';

function resetPw() {

  const navigate = useNavigate();//router method
  const { token } = useParams(); // server generated token get as a parameter
  const [password, setPassword] = useState("");//password state 
 
//password form handler 
  const submitHandler = async (e) => {
    e.preventDefault();

    // pass the validation to const variable 
    const passwordError = validatePassword(password);
    if (!!passwordError) { // error checking
      return toast.error(passwordError); // toast msg 
    }

    // password is a data variable obj
    const data = { password };

    try {
      const response = await axios.post(
        `https://blog-backend-kbvp.onrender.com/api/user/reset/${token}`,// calling the server 
        data
      );

      if (response && response.data) {  // server response checking
        toast.success("Password Reset Successful"); // if server response success status , toast show success msg
       // add time out to refresh and navigate
        setTimeout(() => {
          navigate("/login");
        }, 1500);//1500seconds
      }

      setPassword("");// after pw state empty
      e.target.reset();// reset all fields

    } catch (err) {// checking error
      console.error("Reset failed:", err); // display error in console
      toast.error("Reset Failed. Please check your credentials."); // toast msg 
    }
  };

  

  return (
    <div>
      <section className=" bg-regBack bg-cover min-h-screen">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
              <div className="w-full px-6 py-3">
                <div>
                  <div className="mt-3 text-left sm:mt-5">
                    <div className="inline-flex items-center w-full">
                      <h3 className="text-lg font-bold text-neutral-600 l reading-6 lg:text-5xl">
                        Reset Now
                      </h3>
                    </div>
                    <div className="mt-4 text-base text-gray-500">
                      <p>Reset and get your latest opportunity.</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={submitHandler} method="post">
                  <div className="mt-6 space-y-2">

                  {/* <div>
                      <label for="password" className="sr-only">
                        OTP Number
                      </label>
                      <input
                        type="number"
                        name="otp"
                        id="password"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        placeholder="Enter your password"
                      />
                    </div> */}




                    <div>
                      <label for="password" className="sr-only">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="flex flex-col mt-4 lg:space-y-2">
                      <button
                        type="submit"
                        className="flex items-center justify-center w-full px-10 py-2 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-3"
                      >
                        set now
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

export default resetPw;
