import React from "react";
import HeadMaster from "../assets/head.png";
import BG from "../assets/headerbg.jpg";

function Autor() {
  return (
    <div data-aos="fade-down"
    data-aos-easing="linear"
    data-aos-duration="2000">
      <section className="text-gray-600 body-font bg-wave bg-cover  ">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="max-w-screen-md mb-8 lg:mb-16" >
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className=" sm:text-xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent">
              Here at Novatechzone we focus on markets where technology,
              innovation, and capital can unlock long-term value and drive
              economic growth.
            </p>
          </div>
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={BG}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <img className=" rounded-full" src={HeadMaster} alt="image" />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg dark:text-gray-400">
                    Phoebe Caulfield
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base dark:text-gray-500">
                    Unveiling the Stories, Insights, and Passions that Drive Our
                    Content — Because Behind Every Article, There's a Remarkable
                    Author.
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4 bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent">
                  we bring you the brilliant minds shaping the narratives and
                  ideas on WriteWave. Get to know our talented contributors,
                  each with a unique voice and perspective. From seasoned
                  experts to emerging talents, our diverse lineup of authors is
                  committed to delivering engaging and thought-provoking
                  content. Click on their profiles to explore their expertise,
                  interests, and a curated selection of their latest articles.
                  Connect with the voices that resonate with you and join us in
                  celebrating the vibrant community of creators at the heart of
                  our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Autor;
