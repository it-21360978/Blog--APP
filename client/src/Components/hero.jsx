import React from "react";
import SPLINE from "../Pages/spline"; // 3d model
import { useTypewriter, Cursor } from 'react-simple-typewriter'


function hero() {

  const [text] = useTypewriter({
    /* Hook Config */
    words: [' With WriteWave, embark on a journey of exploration, connecting with a community that shares your passions.'],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 1000,
  })
 // const text1 = "Discover a seamless blend of informative content designed to elevate your learning experience. With WriteWave, embark on a journey of exploration, connecting with a community that shares your passions.";


  return (
    <div className=" min-h-screen bg-gradient-to-r from-sky-50 to-sky-200">
      <section>
        <div className=" items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24 mt-5">
          <div className="flex w-full mx-auto text-left">
            <div className=" inline-flex items-center mx-auto align-middle">
              <div className="text-center">
                
                <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
                  Explore, Learn, and Connect through Curated
                  <br className="hidden lg:block" />
                  Content Tailored Just for You
                </h1>
                <p className="max-w-xl mx-auto mt-8 text-xl leading-relaxed text-gray-500">
                Discover a seamless blend of informative content designed to elevate your learning experience.
                {text}<Cursor />
                </p>
              </div>
            </div>
          </div>
          <section id="intro">
            <div className="flex flex-col items-center justify-center pt-12 mx-auto rounded-3xl  lg:px-10">
              {/**3d model render */}
              <SPLINE />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default hero;
