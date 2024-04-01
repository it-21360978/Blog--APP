import React from "react";
import ManImage from "../assets/CTABG.png";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img  data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine"
              className="object-cover object-center rounded w-[720px] h-[600]"
              alt="hero"
              src={ManImage}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center" data-aos="fade-left" data-aos-offset="300"
     data-aos-easing="ease-in-sine">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
              Explore, Learn, and Connect
              <br className="hidden lg:inline-block" />
              Like Never Before
            </h1>
            <p className="mb-8 leading-relaxed text-gray-900 dark:text-gray-500">
              Ready to take your knowledge journey to the next level? Join our
              community and experience a world of curated insights, vibrant
              discussions, and endless possibilities. Sign up for exclusive
              updates, personalized recommendations, and direct engagement with
              our talented authors. Don't miss out on the opportunity to shape
              your learning experience and connect with like-minded individuals.
            </p>
            <div className="flex justify-center">
              <Link to='/login'>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign-in Now
              </button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CTA;
