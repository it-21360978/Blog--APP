import React,{useState} from "react";
import Header from "../Components/navBar";
import {
  SubjectValidation,
  MessageValidation,
  validateEmail,
} from "../Validations/CommonFormValidations";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Contact() {
  const navigate = useNavigate(); // navigation hook
  const [email, setEmail] = useState(""); // email state
  const [subject, setSubject] = useState(""); //subject state
  const [message, setMessage] = useState(""); // massage state

  // method for form data post
  const submitHandler = async (e) => {
    e.preventDefault();

    //add validations for const variable
    const EmailValidation = validateEmail(email);
    const subjectValidation = SubjectValidation(subject);
    const messageValidation = MessageValidation(message);

    //checking  form input fields and display msg
    if (EmailValidation || subjectValidation || messageValidation) {
      toast.error(EmailValidation || subjectValidation || messageValidation);
      return;
    }

    // pass the subject, email and message as a data object
    const data = { email, subject, message };

    try {
      const res = await axios.post("https://blog-backend-kbvp.onrender.com/api/feedback", data); // serevr calling
      const result = res.data; // server response
     // console.log(result);
      toast.success("Thank you for valuable feedback"); // show toast

      setEmail(""); //set state empty
      setSubject(""); // set sub state empty
      setMessage(""); // set msg empty
      e.target.reset(); // all fields reset

      navigate("/"); //navigate to home
    } catch (err) {
      // checking errors
      console.error("Contact failed:", err); // serevr response error
      toast.error("Contact Failed!.Please check your credentials."); // toast error
    }
  };

  return (
    <div className="bg-Back bg-cover">
      <section className=" py-5 min-h-screen ">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md ">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <div className=" bg-white/10 border p-6 rounded-3xl">
            <form method="POST" onSubmit={submitHandler} className="space-y-8 ">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  for="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  for="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
